/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'

import { useClipboard } from '@idux/cdk/clipboard'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'
import { IxTooltip } from '@idux/components/tooltip'

import { useEllipsisCSS } from './composables/useEllipsisCss'
import { useExpanded } from './composables/useExpanded'
import { useTextProps } from './composables/useTextProps'
import { textProps } from './types'
import { truncateText } from './utils'

export default defineComponent({
  props: {
    ...textProps,
  },
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-text`)

    const { width, rows, tooltip, onExpand } = useTextProps(props)
    const { expanded } = useExpanded(props)

    const copied = ref(false)
    const { copy } = useClipboard()

    function handleCopy(evt: Event) {
      evt.stopPropagation()
      if (copied.value) {
        return
      }
      copied.value = true
      const content = container.value?.innerText ?? ''
      copy(content).then(() => {
        setTimeout(() => {
          copied.value = false
        }, 3000)
      })
    }

    watch(expanded, () => {
      callEmit(onExpand)
      if (props.copyable && props.ellipsis) {
        truncateText(container.value!, domWidth.value * (rows ?? 1), expanded.value)
      }
    })

    const container = ref<HTMLElement | null>(null)
    const domWidth = ref(0)

    const handleResize = () => {
      domWidth.value = container.value ? container.value.getClientRects()[0].width : 0

      if (props.copyable && props.ellipsis) {
        truncateText(container.value!, domWidth.value * (rows ?? 1))
      }
    }

    onMounted(() => {
      handleResize()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    const styles = useEllipsisCSS(width, rows)

    function render() {
      return (
        <a class={`${mergedPrefixCls.value}-copy`} onClick={handleCopy}>
          {copied.value ? <IxIcon name="check" /> : <IxIcon name="copy" />}
        </a>
      )
    }

    return () => {
      if (!slots.default) {
        return null
      }

      const content = slots.default()

      return tooltip && !expanded.value ? (
        <IxTooltip title={tooltip}>
          <p style={expanded.value ? undefined : props.copyable ? undefined : styles} ref={container}>
            <span>{content}</span>
            <span>{props.copyable && render()}</span>
          </p>
        </IxTooltip>
      ) : (
        <p style={expanded.value ? undefined : props.copyable ? undefined : styles} ref={container}>
          <span>{content}</span>
          <span>{props.copyable && render()}</span>
        </p>
      )
    }
  },
})
