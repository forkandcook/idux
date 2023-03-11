import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import Text from '../src/Text'
import { TextProps } from '../src/types'

const TextMount = (options?: MountingOptions<Partial<TextProps>>) =>
  mount(Text, { ...(options as MountingOptions<TextProps>) })

renderWork<TextProps>(Text)

describe('Text', () => {
  test('type work', async () => {
    const wrapper = TextMount({ props: { type: 'secondary' } })
    expect(wrapper.classes()).toContain('ix-text-secondary')

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.classes()).toContain('ix-text-success')

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.classes()).toContain('ix-text-warning')

    await wrapper.setProps({ type: 'danger' })
    expect(wrapper.classes()).toContain('ix-text-danger')

    await wrapper.setProps({ type: undefined })
    expect(wrapper.classes()).not.toContain('ix-text-secondary')
    expect(wrapper.classes()).not.toContain('ix-text-success')
    expect(wrapper.classes()).not.toContain('ix-text-warning')
    expect(wrapper.classes()).not.toContain('ix-text-danger')
  })

  test('disabled work', async () => {
    const wrapper = TextMount({ props: { disabled: true } })
    expect(wrapper.classes()).toContain('ix-text-disabled')

    await wrapper.setProps({ disabled: false })
    expect(wrapper.classes()).not.toContain('ix-text-disabled')
  })

  test('delete work', async () => {
    const wrapper = TextMount({ props: { delete: true } })
    expect(wrapper.find('del')).not.toBeNull()

    await wrapper.setProps({ delete: false })
    expect(wrapper.find('del').exists()).toBeFalsy
  })

  test('underline work', async () => {
    const wrapper = TextMount({ props: { underline: true } })
    expect(wrapper.find('u')).not.toBeNull()

    await wrapper.setProps({ underline: false })
    expect(wrapper.find('u').exists()).toBeFalsy
  })

  test('mark work', async () => {
    const wrapper = TextMount({ props: { mark: true } })
    expect(wrapper.find('mark')).not.toBeNull()

    await wrapper.setProps({ mark: false })
    expect(wrapper.find('mark').exists()).toBeFalsy
  })

  test('code work', async () => {
    const wrapper = TextMount({ props: { code: true } })
    expect(wrapper.find('code')).not.toBeNull()

    await wrapper.setProps({ code: false })
    expect(wrapper.find('code').exists()).toBeFalsy
  })

  test('keyboard work', async () => {
    const wrapper = TextMount({ props: { keyboard: true } })
    expect(wrapper.find('kbd')).not.toBeNull()

    await wrapper.setProps({ keyboard: false })
    expect(wrapper.find('kbd').exists()).toBeFalsy
  })

  test('strong work', async () => {
    const wrapper = TextMount({ props: { strong: true } })
    expect(wrapper.find('strong')).not.toBeNull()

    await wrapper.setProps({ strong: false })
    expect(wrapper.find('strong').exists()).toBeFalsy
  })

  test('italic work', async () => {
    const wrapper = TextMount({ props: { italic: true } })
    expect(wrapper.find('i')).not.toBeNull()

    await wrapper.setProps({ italic: false })
    expect(wrapper.find('i').exists()).toBeFalsy
  })

  test('ellipsis work', () => {
    const wrapper = TextMount({ props: { ellipsis: true } })
    expect(wrapper.classes()).toContain('ix-text-ellipsis')
  })

  test('copyable work', () => {
    const wrapper = TextMount({ props: { copyable: true } })
    expect(wrapper.find('.ix-text-copy')).not.toBeNull()
  })
})
