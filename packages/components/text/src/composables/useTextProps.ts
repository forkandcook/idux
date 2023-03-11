/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { EllipsisProps, TextProps } from '../types'

export function useTextProps(props: TextProps): EllipsisProps {
  return props.ellipsis instanceof Object ? props.ellipsis : {}
}
