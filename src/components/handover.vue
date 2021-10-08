<template>
  <div class="row">
    <h4>Handover</h4>
  </div>
  <form id="display-img" @submit.prevent="showImages">
    <div class="row align-items-end">
      <div class="col-8">
        <label class="form-label w-100"
          >Image urls, one per line:
          <textarea type="text" name="imgUrl" class="form-control" />
        </label>
      </div>
      <div class="col-4 d-grid py-2">
        <button class="btn btn-primary extend" :disabled="!activated">
          Display image
        </button>
      </div>
    </div>
  </form>
  <div class="row">
    <component
      v-for="comp in imgComponent"
      :key="comp.name"
      :is="comp"
      :images="images"
    />
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { extensionPoints } from "pluggable-electron";

export default {
  props: {
    activated: Boolean,
  },
  setup(props) {
    const images = ref([]);
    const imgComponent = computed(() => {
      console.log({ activated: props.activated });
      if (!props.activated) return [];

      return extensionPoints.execute("display-img");
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
