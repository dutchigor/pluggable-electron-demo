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
    async function update() {
      const plugins = await window.plugins.getActive();
      plugins.forEach((plugin) => window.plugins.update(plugin.name));
      console.log("Plugins updated");
    }

    return { update };
  },
};
</script>

<style>
</style>