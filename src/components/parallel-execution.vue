<template>
  <div class="row">
    <h4>Parallel execution</h4>
  </div>
  <div class="row align-items-start">
    <div class="col-8">
      <p class="menu-title">Demo menu:</p>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <div class="navbar-collapse">
            <ul class="navbar-nav">
              <!-- <li class="nav-item dropdown">
                <a
                  href="#"
                  class="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >parent item
                </a>
                <ul class="dropdown-menu" id="demo-parent-li"></ul>
              </li> -->
              <li v-for="item in menuItems" :key="item.id" class="nav-item">
                <a href="#" class="nav-link">{{ item.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="col-4 d-grid py-2">
      <button
        class="btn btn-primary extend"
        id="extend-menu"
        :disabled="!activated"
      >
        Extend demo menu
      </button>
    </div>
  </div>
</template>

<script>
import { Dropdown } from "bootstrap";
import { extensionPoints } from "pluggable-electron";
import { ref } from "vue";

export default {
  props: {
    activated: Boolean,
  },
  setup() {
    // Set default menu items
    const defMenuItems = [{ text: "parent item", id: "demo-parent-li" }];

    // Get additional menu items from plugins, providing the desired parent item
    // await Promise.all(
    //   extensionPoints.execute("extend-menu", "demo-parent-li")
    // )

    // transform menu items
    const menuItems = ref(
      defMenuItems.reduce((itemList, item) => {
        if (item.parent) {
          const parent = itemList.find((el) => (item.parent = el.id));
          if (parent) {
            el.children = el.children || [];
            el.children.push(item);
            return itemList;
          }
        }
        itemList.push(item);
        return itemList;
      }, [])
    );

    return { menuItems };
  },
};
</script>

<style>
</style>