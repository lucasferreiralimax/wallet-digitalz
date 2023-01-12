<script setup lang="ts">
import { ref } from 'vue'
import NewRegister from '../NewRegister/index.vue'

const panel = ref<string[]>([])
const panelChangeView = ref<boolean>(false)

function changeView () {
  panel.value = !panelChangeView.value ? ['foo', 'bar', 'baz'] : []
  panelChangeView.value = !panelChangeView.value;
}
</script>

<template>
  <div>
    <div class="text-center d-flex pb-4">
      <NewRegister />
      <v-btn class="ma-2" @click="changeView">
        <template v-if="!panelChangeView">
          <v-icon class="icon" icon="mdi-arrow-expand-vertical" />
          Expand All
        </template>
        <template v-else>
          <v-icon class="icon" icon="mdi-arrow-collapse-vertical" />
          Compact All
        </template>
      </v-btn>
    </div>
    <v-expansion-panels
      v-model="panel"
      multiple
    >
      <v-expansion-panel
        title="Foo"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        value="foo"
      ></v-expansion-panel>

      <v-expansion-panel
        title="Bar"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        value="bar"
      ></v-expansion-panel>

      <v-expansion-panel
        title="Baz"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        value="baz"
      ></v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.icon {
  margin-right: .5rem;
}
</style>
