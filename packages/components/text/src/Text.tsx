/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, h, normalizeClass, ref } from 'vue'

import { useClipboard } from '@idux/cdk/clipboard'
import { callEmit } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { IxIcon } from '@idux/components/icon'

import IxTypography from './Typography'
import { textProps } from './types'

export default defineComponent({
  name: 'IxText',
  props: textProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-text`)

    const container = ref<HTMLElement | null>(null)

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

    const handleClick = (evt: Event) => {
      if (props.onClick) {
        callEmit(props.onClick, evt)
      }
    }

    const classes = computed(() => {
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${props.type}`]: !!props.type,
        [`${prefixCls}-disabled`]: props.disabled,
        [`${prefixCls}-ellipsis`]: props.ellipsis,
      })
    })

    const renderContent = () => {
      if (!slots.default) {
        return null
      }

      let content = slots.default()

      if (props.copyable) {
        content.push(
          <a class={`${mergedPrefixCls.value}-copy`} onClick={handleCopy}>
            {copied.value ? <IxIcon name="check" /> : <IxIcon name="copy" />}
          </a>,
        )
      }

      function wrapContent(tag: string, isDefine: boolean) {
        if (!isDefine) {
          return
        }

        content = [h(tag, content)]
      }

      wrapContent('code', props.code)
      wrapContent('kbd', props.keyboard)
      wrapContent('u', props.underline)
      wrapContent('del', props.delete)
      wrapContent('strong', props.strong)
      wrapContent('i', props.italic)
      wrapContent('mark', props.mark)

      return content
    }

    return () => {
      return props.ellipsis ? (
        <div class={classes.value} onClick={handleClick}>
          <IxTypography {...props} v-slots={slots}></IxTypography>
        </div>
      ) : (
        <span class={classes.value} onClick={handleClick} ref={container}>
          {renderContent()}
        </span>
      )
    }
  },
})
