<template>
  <form @submit.prevent="uninstall">
    <div class="row align-items-end">
      <div class="col-8">
        <label class="form-label"
          >Package name:
          <input type="text" class="form-control" v-model="pluginName" />
        </label>
      </div>
      <div class="col-4 d-grid py-2">
        <button class="btn btn-primary">Uninstall</button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import {plugins} from 'pluggable-electron/renderer';

export default {
  setup() {
    const pluginName = ref("");

    // Send the filename of the to be uninstalled plugin
    // to the main process for removal
    async function uninstall() {
      const res = await plugins.uninstall([pluginName.value]);
      console.log(
        res
          ? "Plugin successfully uninstalled"
          : "Plugin could not be uninstalled"
      );

      // reset the input field
      pluginName.value = "";
    }

    return { pluginName, uninstall };
  },
};
</script>

<style>
</style>