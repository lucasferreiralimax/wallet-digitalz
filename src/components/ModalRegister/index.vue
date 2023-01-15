<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { useWalletStore } from '@/stores/wallet'
import { TypeRegister, Register } from '@/types'

const props = defineProps<{ update?: boolean, register: Register }>()
const wallet = useWalletStore()
const dialog = ref<boolean>(false)
const valid = ref<boolean>(false)
const myForm = ref()
const typeRegister = ref<TypeRegister | undefined>(props.register ? props.register.type : undefined)
const name = ref<string | undefined>(props.register ? props.register.name : undefined)
const value = ref<number | undefined>(props.register ? props.register.value : undefined)
const description = ref<string | undefined>(props.register ? props.register.description : undefined)

const typeRules = [
  (v: string) => !!v || 'Type is required'
]

const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => v.length <= 15 || 'Name must be less than 15 characters',
]

const valueRules = [
  (v: string) => !!v || 'Value is required'
]

const descriptionRules = [
(v: string) => !!v || 'Description is required',
  (v: string) => v.length > 20 || 'Description must be more than 20 characters',
  (v: string) => v.length <= 250 || 'Description must be less than 250 characters',
]

function close () {
  if (!props.update) myForm.value.reset()
  dialog.value = false
}

async function validate () {
  const { valid } = await myForm.value.validate()

  if (valid) {
    const formData = {
      name: name.value,
      type: typeRegister.value,
      value: value.value,
      description: description.value
    }

    if (props.update) {
      wallet.editRegister({
        id: props.register.id,
        ...formData
      })
    } else {
      wallet.newRegister({
        id: uuidv4(),
        ...formData
      })
    }

    close()
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-if="!update"
        color="success"
        class="ma-2"
        v-bind="props"
      >
        <v-icon class="mr-2" icon="mdi-plus" />
        {{ $t('actions.register') }}
      </v-btn>
      <v-btn
        v-if="update"
        color="success"
        v-bind="props"
        size="x-small"
        icon="mdi-pencil"
      />
    </template>
    <v-card class="mx-auto pa-4" max-width="600" width="100%">
      <v-card-title>
        <span class="text-h5">{{ update ? $t('register.update') : $t('register.create') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-form v-model="valid" ref="myForm">
            <v-row>
              <v-col
                cols="12"
                class="pa-0 pb-2"
              >
                <v-select
                  :label="$t('register.form.type')"
                  v-model="typeRegister"
                  :rules="typeRules"
                  item-title="label"
                  item-value="value"
                  return-object
                  single-line
                  :items="[
                    { label: $t('register.form.investiment'), value: 'investiment' },
                    { label: $t('register.form.expense'), value: 'expense' },
                    { label: $t('register.form.entry'), value: 'entry' },
                  ]"
                />
              </v-col>
              <v-col
                cols="12"
                class="pa-0 pb-2"
              >
                <v-text-field
                :label="$t('register.form.name')"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                class="pa-0 pb-2"
              >
                <v-text-field
                :label="$t('register.form.value')"
                  v-model="value"
                  prefix="$"
                  type="number"
                  :rules="valueRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                class="pa-0 pb-2"
              >
                <v-textarea
                :label="$t('register.form.description')"
                  v-model="description"
                  :rules="descriptionRules"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small class="d-flex mt-4">{{ $t('register.form.indicates') }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          variant="text"
          @click="close"
        >
          <v-icon class="mr-2" icon="mdi-cancel" />
          {{ $t('actions.cancel') }}
        </v-btn>
        <v-btn
          color="success"
          variant="flat"
          @click="validate"
        >
          <v-icon class="mr-2" icon="mdi-check" />
          {{ update ? $t('actions.save') : $t('actions.create') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
