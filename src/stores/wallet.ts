import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

type Register = {
  id: string;
  name: string;
  value: number;
  description: string;
}

interface State {
  registers: Register[]
}

export const useWalletStore = defineStore('wallet', {
  state: (): State => {
    return {
      registers: useStorage('my-wallet', [] as Register[]).value,
    }
  },
  actions: {
    newRegister(register: Register) {
      this.registers.push(register)
    },
    editRegister(register: Register) {
      const itemIndex = this.registers.findIndex(item => item.id == register.id)
      this.registers[itemIndex] = register;
    },
    deleteRegister(id: string) {
      this.registers = this.registers.filter(item => item.id !== id)
    },
  },
})
