interface WaitForElementOptions<T extends Element = Element> {
  /** 超時時間（毫秒），預設 10000 */
  timeout?: number
  /** 觀察的父元素，預設 document.body */
  parent?: Element | Document
  /** 是否等待多個元素，預設 false */
  multiple?: boolean
  /** 是否只等待可見元素，預設 false */
  visible?: boolean
  /** 自定義條件函數 */
  condition?: (element: T) => boolean
}

// function overloads
export function waitForElement<T extends Element = Element>(
  selector: string,
  options: WaitForElementOptions<T> & { multiple: true },
): Promise<T[]>

export function waitForElement<T extends Element = Element>(
  selector: string,
  options?: WaitForElementOptions<T> & { multiple?: false },
): Promise<T>

export function waitForElement<T extends Element = Element>(
  selector: string,
  options: WaitForElementOptions<T> = {},
): Promise<T | T[]> {
  const {
    timeout = 10000,
    parent = document.body,
    multiple = false,
    visible = false,
    condition = null,
  } = options

  return new Promise((resolve, reject) => {
    let timeoutId: NodeJS.Timeout
    // 檢查元素的函數
    const checkElement = (): T | T[] | null => {
      let elements: T | T[] | null

      if (multiple) {
        const nodeList = document.querySelectorAll<T>(selector)
        elements = Array.from(nodeList)
        if ((elements as T[]).length === 0)
          return null
      }
      else {
        elements = document.querySelector<T>(selector)
        if (!elements)
          return null
      }

      // 檢查可見性
      if (visible) {
        const isVisible = (el: T): boolean => {
          const rect = el.getBoundingClientRect()
          return rect.width > 0 && rect.height > 0
            && window.getComputedStyle(el).visibility !== 'hidden'
        }

        if (multiple) {
          elements = (elements as T[]).filter(isVisible)
          if ((elements as T[]).length === 0)
            return null
        }
        else {
          if (!isVisible(elements as T))
            return null
        }
      }

      // 檢查自定義條件
      if (condition) {
        if (multiple) {
          elements = (elements as T[]).filter(condition)
          if ((elements as T[]).length === 0)
            return null
        }
        else {
          if (!condition(elements as T))
            return null
        }
      }

      return elements
    }

    // 先檢查元素是否已經存在
    const existingElement = checkElement()
    if (existingElement) {
      resolve(existingElement)
      return
    }

    // 創建 MutationObserver
    const observer = new MutationObserver(() => {
      const element = checkElement()
      if (element) {
        observer.disconnect()
        clearTimeout(timeoutId)
        resolve(element)
      }
    })

    // 設置超時
    timeoutId = setTimeout(() => {
      observer.disconnect()
      reject(new Error(`等待元素 "${selector}" 超時 (${timeout}ms)`))
    }, timeout)

    // 開始觀察
    observer.observe(parent, {
      childList: true,
      subtree: true,
      attributes: visible,
      attributeFilter: visible ? ['style', 'class'] : undefined,
    })
  })
}
