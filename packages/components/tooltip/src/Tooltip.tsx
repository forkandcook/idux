/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipProps } from './types'
import type { CSSProperties, Slots } from 'vue'

import { computed, defineComponent } from 'vue'

import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'

import { tooltipProps } from './types'
import { useTooltipOverlay } from './useTooltipOverlay'

export default defineComponent({
  name: 'IxTooltip',
  props: tooltipProps,
  setup(props, { slots, expose }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('tooltip')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tooltip`)
    const { overlayRef, updatePopper, overlayProps } = useTooltipOverlay(props, config, mergedPrefixCls)
    const ellipsisProps = computed(() => props.ellipsis)

    expose({ updatePopper })

    return () => {
      const prefixCls = mergedPrefixCls.value
      let ellipsisContent = null

      if (ellipsisProps.value) {
        const wrap = isEllipsis(props.title!, ellipsisProps.value.width)
        if (!wrap) {
          return <span class={`${prefixCls}-ellipsis`}>{props.title}</span>
        }

        const style: CSSProperties = {
          display: 'inline-block',
          width: `${ellipsisProps.value.width}px`,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }

        ellipsisContent = (
          <span class={`${prefixCls}-ellipsis`} style={style}>
            {props.title}
          </span>
        )
      }

      return (
        <ɵOverlay
          ref={overlayRef}
          v-slots={{
            default: ellipsisProps.value ? ellipsisContent : slots.default,
            content: () => renderContent(props, slots, prefixCls),
          }}
          class={prefixCls}
          transitionName={`${common.prefixCls}-fade-fast`}
          {...overlayProps.value}
        />
      )
    }
  },
})

const renderContent = (props: TooltipProps, slots: Slots, prefixCls: string) => {
  if (!(slots.title || props.title)) {
    return null
  }
  return <div class={`${prefixCls}-wrapper`}>{slots.title ? slots.title() : props.title}</div>
}

// 判断是否换行
const isEllipsis = (title: string, width: number) => {
  const span = document.createElement('span')
  span.style.visibility = 'hidden'
  span.style.whiteSpace = 'nowrap'
  span.innerText = title
  document.body.appendChild(span)
  const length = span.offsetWidth
  document.body.removeChild(span)

  return length > width
}
