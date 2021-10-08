<template>
  <div id="carouselComponent" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(img, idx) in images"
        :key="img"
        :class="{ 'carousel-item': true, active: idx === 0 }"
      >
        <img :src="img" class="d-block w-100" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["images", "controls"],
};
</script>
