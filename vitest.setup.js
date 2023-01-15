import { config } from '@vue/test-utils'
import { vi } from 'vitest'

import { createTestingPinia } from '@pinia/testing'
import i18n from '@/i18n'

config.global.plugins = [
  createTestingPinia({ createSpy: vi.fn() })
]

config.global.plugins = [i18n()]
