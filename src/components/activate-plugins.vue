<template>
  <div class="row justify-content-end">
    <div class="col-4 d-grid py-2">
      <button class="btn btn-primary" @click="activate">
        Activate plugins
      </button>
    </div>
  </div>
</template>

<script>
import { activationPoints } from "pluggable-electron";

export default {
  setup() {
    // Trigger the init activation point on clicking activate plugins
    function activate() {
      activationPoints.trigger("init");
      console.log("'Init' activation point triggered.");
    }

    return { activate };
  },
};
</script>
