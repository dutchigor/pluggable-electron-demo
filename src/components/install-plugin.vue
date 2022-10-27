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
import { plugins,activationPoints } from "pluggable-electron/renderer";
import { ref, toRaw } from "vue";

export default {
  setup() {
    const filePaths = ref([]);

    // Store path of selected file
    function setFilePath(e) {
      const files = Array.from(e.target.files)
      filePaths.value = files.map(file => file.path)
    }

    // Send the filename of the to be installed plugin
    // to the main process for installation
    async function install(e) {
      const plugin = await plugins.install(toRaw(filePaths.value));
      console.log("Installed plugins:", plugin);

      // Reset the form
      e.target.reset();
    }

    return { filePath: filePaths, setFilePath, install };
  },
};
</script>
