<template>
  <div class="container my-5">
    <div class="row row-cols-1 row-cols-lg-2 g-4">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Manage plugin lifecycle</h2>
          </div>
          <div class="card-body border-top">
            <install-plugin />
          </div>
          <div class="card-body border-top">
            <uninstall-plugin />
          </div>
          <div class="card-body border-top">
            <update-plugins />
          </div>
          <div class="card-body border-top">
            <activate-plugins @activated="activated = $event" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h2>Test Extension Points</h2>
          </div>
          <div class="card-body border-top">
            <parallel-execution :activated="activated" />
          </div>
          <div class="card-body border-top">
            <serial-execution :activated="activated" />
          </div>
          <div class="card-body border-top">
            <handover :activated="activated" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import installPlugin from "./components/install-plugin.vue";
import UninstallPlugin from "./components/uninstall-plugin.vue";
import UpdatePlugins from "./components/update-plugins.vue";
import ActivatePlugins from "./components/activate-plugins.vue";
import ParallelExecution from "./components/parallel-execution.vue";
import { ref } from "vue";
import SerialExecution from "./components/serial-execution.vue";
import Handover from "./components/handover.vue";
import * as bootstrap from "bootstrap";

export default {
  components: {
    installPlugin,
    UninstallPlugin,
    UpdatePlugins,
    ActivatePlugins,
    ParallelExecution,
    SerialExecution,
    Handover,
  },
  setup() {
    const activated = ref(false);

    return { activated };
  },
};
</script>
