import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import NewRegister from './index.vue'

const wrapper = shallowMount(NewRegister)

describe('Basic render NewRegister', () => {
  it('is NewRegister a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
