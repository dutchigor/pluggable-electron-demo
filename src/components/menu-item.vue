<template>
  <li class="nav-item">
    <a href="#" class="nav-link">{{ itemText }}</a>
  </li>
</template>

<script>
export default {
  props: {
    itemText: String,
  },
};
</script>
