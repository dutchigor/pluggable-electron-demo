<template>
  <div class="row justify-content-end">
    <div class="col-4 d-grid py-2">
      <button class="btn btn-primary" @click="update">Update plugins</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    // Update all plugins on clicking update plugins
    async function update() {
      // Get all active plugins
      const plugins = await window.plugins.getActive();

      // Update each plugin
      plugins.forEach((plugin) => window.plugins.update(plugin.name));

      console.log("Plugins updated");
    }

    return { update };
  },
};
</script>
