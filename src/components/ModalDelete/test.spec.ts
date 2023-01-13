import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ModalDelete from './index.vue'

const wrapper = shallowMount(ModalDelete)

describe('Basic render ModalDelete', () => {
  it('is ModalDelete a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
