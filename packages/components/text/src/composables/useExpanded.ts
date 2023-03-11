/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { ComputedRef, computed } from 'vue'

import { EllipsisProps, TextProps } from '../types'

export function useExpanded(props: TextProps): {
  expanded: ComputedRef<boolean>
} {
  const expanded = computed(() => {
    return (props.ellipsis as EllipsisProps)?.expanded ?? false
  })

  return { expanded }
}
