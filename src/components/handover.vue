<template>
  <div class="row">
    <h4>Handover</h4>
  </div>
  <form id="display-img" @submit.prevent="showImages">
    <div class="row align-items-end">
      <div class="col-8">
        <label class="form-label w-100">
          Image urls, one per line:
          <textarea type="text" name="imgUrl" class="form-control" />
        </label>
      </div>
      <div class="col-4 d-grid py-2">
        <button class="btn btn-primary extend" :disabled="!activated">Display images</button>
      </div>
    </div>
  </form>
  <div class="row">
    <component v-if="imgComponent" :is="imgComponent" :key="imgComponent.name" :images="images" />
  </div>
</template>

<script>
import { ref, computed, inject } from "vue";

export default {
  props: {
    activated: Boolean,
  },
  setup(props) {
    const images = ref([]);

    // Provided in main.js
    const extensionManager = inject("extensionManager");
    const imgComponent = computed(() => {
      // Only execute the extension point after the relevant activation point has been triggered.
      if (!props.activated || !images.value.length) return false;
      const extensions = extensionManager.get();
      return extensions['display-img'] && extensions['display-img'].get('slider')
    });

    // With Vue plugins should not manipulate the dom directly.
    // Instead, return a dynamic component to be used in the template.
    function showImages(e) {
      images.value = e.target.elements.imgUrl.value.split(/\r?\n/);
    }

    return { showImages, images, imgComponent };
  },
};
</script>
