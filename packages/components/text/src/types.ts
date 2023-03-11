/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type TextStyle = 'secondary' | 'success' | 'warning' | 'danger'

export const textProps = {
  type: String as PropType<TextStyle>,
  disabled: Boolean,
  delete: Boolean,
  underline: Boolean,
  code: Boolean,
  mark: Boolean,
  keyboard: Boolean,
  strong: Boolean,
  italic: Boolean,
  copyable: Boolean,

  ellipsis: {
    type: [Boolean, Object] as PropType<boolean | EllipsisProps>,
    default: false,
  },

  // events
  onClick: Function as PropType<(e: Event) => void>,
} as const

export type TextProps = ExtractInnerPropTypes<typeof textProps>
export type TextPublicProps = ExtractPublicPropTypes<typeof textProps>
export type TextComponent = DefineComponent<Omit<HTMLAttributes, keyof TextPublicProps> & TextPublicProps>
export type TextInstance = InstanceType<DefineComponent<TextProps>>

export type EllipsisProps = Partial<{
  width: number
  rows: number
  expanded: boolean
  tooltip: string
  fontSize: number
  onExpand: () => void
}>
