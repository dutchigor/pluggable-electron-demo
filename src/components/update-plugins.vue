<template>
  <div class="row justify-content-end">
    <div class="col-4 d-grid py-2">
      <button class="btn btn-primary" @click="update">Update plugins</button>
    </div>
  </div>
</template>

<script>
import { plugins } from 'pluggable-electron/renderer'

export default {
  setup() {
    // Update all plugins on clicking update plugins
    async function update() {
      // Get all active plugins
      const plgs = await plugins.getActive();

      // Update each plugin
      const names = plgs.map(plugin => plugin.name)
      plugins.update(names)

      console.log("Plugins updated");
    }

    return { update };
  },
};
</script>
