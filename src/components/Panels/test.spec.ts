import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import Panels from './index.vue'

const wrapper = shallowMount(Panels)

describe('Basic render Panels', () => {
  it('is Panels a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
