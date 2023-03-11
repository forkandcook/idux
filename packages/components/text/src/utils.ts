/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

let count = 0
const uuid = () => `idux-${count++}`
const contentMap = new Map<string, HTMLElement>()
const ellipsisMap = new Map<string, HTMLElement>()

function getTextWidth(text: string, style: CSSStyleDeclaration) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  context.font = `${style.fontSize} ${style.fontFamily}`
  const metrics = context.measureText(text)

  return metrics.width
}

export function truncateText(container: HTMLElement, width: number, expanded = false): void {
  const id = container.dataset.id || uuid()
  if (!contentMap.has(id)) {
    contentMap.set(id, container.querySelector('span:first-child')!.cloneNode(true) as HTMLElement)
    container.dataset.id = id
  }

  if (expanded) {
    container.querySelector('span:first-child')!.outerHTML = contentMap.get(id)!.outerHTML
    return
  }

  if (ellipsisMap.has(id)) {
    container.querySelector('span:first-child')!.outerHTML = ellipsisMap.get(id)!.outerHTML
    return
  }

  const copyTag = container.querySelector('span:last-child')
  const tagStyle = getComputedStyle(container)
  const ellipsisWidth = getTextWidth('...', tagStyle)
  const copyTagWidth = copyTag ? copyTag.getBoundingClientRect().width : 0

  let remainingWidth = width - ellipsisWidth - copyTagWidth
  const nodes = Array.from(container.querySelector('span:first-child')!.childNodes)

  nodes.some(node => {
    const el = node as HTMLElement
    const text = el.textContent
    const textWidth = getTextWidth(text!, tagStyle)

    if (remainingWidth >= textWidth) {
      remainingWidth -= textWidth
      return false
    } else {
      const rate = remainingWidth / textWidth
      const content = text?.slice(0, Math.floor(text.length * rate))
      el.textContent = content + '...'
      return true
    }
  })

  if (!ellipsisMap.has(id)) {
    ellipsisMap.set(id, container.querySelector('span:first-child')!.cloneNode(true) as HTMLElement)
  }
}
