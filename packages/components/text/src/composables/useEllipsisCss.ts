/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { CSSProperties } from 'vue'

export function useEllipsisCSS(width: number | undefined, rows: number | undefined): CSSProperties {
  if (!rows) {
    rows = 1
  }

  if (rows === 1) {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: width ? `${width}px` : undefined,
    }
  } else {
    return {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': rows ?? 1,
      overflow: 'hidden',
      width: width ? `${width}px` : undefined,
      'text-overflow': 'ellipsis',
    }
  }
}
