<script setup lang="ts">
import { ref } from 'vue'

const panel = ref<string[]>([])

function all () {
  panel.value = ['foo', 'bar', 'baz']
}
function none () {
  panel.value = []
}
</script>

<template>
  <div>
    <div class="text-center d-flex pb-4">
      <v-btn class="ma-2" @click="all">
        Expand All
      </v-btn>
      <v-btn class="ma-2" @click="none">
        Compact All
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
