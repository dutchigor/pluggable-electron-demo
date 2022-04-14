<template>
  <form @submit.prevent="install">
    <div class="row align-items-end">
      <div class="col-8">
        <label class="form-label">
          Package file:
          <input type="file" class="form-control" @change="setFilePath" />
        </label>
      </div>
      <div class="col-4 d-grid py-2">
        <button class="btn btn-primary">Install</button>
      </div>
    </div>
  </form>
</template>

<script>
import { activationPoints } from "pluggable-electron/renderer";
import { ref } from "vue";

export default {
  setup() {
    const filePath = ref("");

    // Store path of selected file
    function setFilePath(e) {
      filePath.value = e.target.files[0].path;
    }

    // Send the filename of the to be installed plugin
    // to the main process for installation
    async function install(e) {
      const plugin = await window.plugins.install(filePath.value);
      console.log("Installed plugin:", plugin);
      // If installation was successful, register its activation points
      if (!plugin.cancelled) activationPoints.register(plugin);

      // Reset the form
      e.target.reset();
    }

    return { filePath, setFilePath, install };
  },
};
</script>
