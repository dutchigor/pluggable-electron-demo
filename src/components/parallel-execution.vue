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
              <li class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">parent item
                </a>
                <ul class="dropdown-menu" id="demo-parent-li">
                  <menu-item v-for="item in menuItems.children" :key="item.id" :itemText="item.text" />
                </ul>
              </li>
              <menu-item v-for="item in menuItems.top" :key="item.id" :itemText="item.text" />
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div class="col-4 d-grid py-2 flex">
      <button class="btn btn-primary extend" id="extend-menu" :disabled="!activated" @click="extendMenu">
        Extend demo menu
      </button>
      <button class="btn btn-primary extend mt-2" id="extend-menu" :disabled="!activated"
        @click="unregMenuItem('newItem')">
        Remove "Item from object"
      </button>
      <button class="btn btn-primary extend mt-2" id="extend-menu" :disabled="!activated" @click="clearMenu">
        Clear menu
      </button>
    </div>
  </div>
</template>

<script>
import MenuItem from "./menu-item.vue";
import { reactive, inject } from "vue";

export default {
  components: { MenuItem },
  props: {
    activated: Boolean,
  },
  setup() {
    // Set up empty menu items
    const menuItems = reactive({
      top: [],
      children: [],
    });

    // Provided in main.js
    const extensionManager = inject("extensionManager");

    // Extend the menu with items coming from plugins
    async function extendMenu() {
      // Get additional menu items from plugins, providing the desired parent item
      const extendedItems = await Promise.all(
        extensionManager.execute("extend-menu", "demo-parent-li")
      );

      // Update the different menu hierarchies in teh template
      menuItems.top = extendedItems.filter((item) => !item.parent);
      menuItems.children = extendedItems.filter(
        (item) => item.parent === "demo-parent-li"
      );
    }

    async function unregMenuItem(item) {
      const extension = extensionManager.get()
      if (extension['extend-menu']) {
        extension['extend-menu'].unregister(item)
        extendMenu()
      }
    }

    function clearMenu() {
      const extensions = extensionManager.get()
      if (extensions['extend-menu']) {
        extensions['extend-menu'].clear()
        extendMenu()
      }

    }

    return { menuItems, extendMenu, unregMenuItem, clearMenu };
  },
};
</script>

<style>
</style>