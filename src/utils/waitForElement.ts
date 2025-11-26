interface WaitForElementOptions {
  /** 超時時間（毫秒），預設 10000 */
  timeout?: number
  /** 觀察的父元素，預設 document.body */
  parent?: Element | Document
  /** 是否等待多個元素，預設 false */
  multiple?: boolean
  /** 是否只等待可見元素，預設 false */
  visible?: boolean
  /** 自定義條件函數 */
  condition?: (element: Element) => boolean
}

// function overloads
export function waitForElement(
  selector: string,
  options: WaitForElementOptions & { multiple: true },
): Promise<Element[]>

export function waitForElement(
  selector: string,
  options?: WaitForElementOptions & { multiple?: false },
): Promise<Element>

export function waitForElement(
  selector: string,
  options: WaitForElementOptions = {},
): Promise<Element | Element[]> {
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
    const checkElement = (): Element | Element[] | null => {
      let elements: Element | Element[] | null

      if (multiple) {
        const nodeList = document.querySelectorAll(selector)
        elements = Array.from(nodeList)
        if ((elements as Element[]).length === 0)
          return null
      }
      else {
        elements = document.querySelector(selector)
        if (!elements)
          return null
      }

      // 檢查可見性
      if (visible) {
        const isVisible = (el: Element): boolean => {
          const rect = el.getBoundingClientRect()
          return rect.width > 0 && rect.height > 0
            && window.getComputedStyle(el).visibility !== 'hidden'
        }

        if (multiple) {
          elements = (elements as Element[]).filter(isVisible)
          if ((elements as Element[]).length === 0)
            return null
        }
        else {
          if (!isVisible(elements as Element))
            return null
        }
      }

      // 檢查自定義條件
      if (condition) {
        if (multiple) {
          elements = (elements as Element[]).filter(condition)
          if ((elements as Element[]).length === 0)
            return null
        }
        else {
          if (!condition(elements as Element))
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
