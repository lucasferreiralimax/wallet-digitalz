import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import HeaderApp from './index.vue'

const wrapper = shallowMount(HeaderApp, {
  propsData: {
    title: 'Wallet Digital'
  }
})

describe('Basic render HeaderApp', () => {
  it('is HeaderApp a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
  it('is HeaderApp with title tag', () => {
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('h1').text()).toBe('Wallet Digital')
  })
  it('is HeaderApp with title props', () => {
    expect(wrapper.vm.title).toBe('Wallet Digital')
  })
})
