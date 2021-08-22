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
            <activate-plugins />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h2>Test Extension Points</h2>
          </div>
          <div class="card-body border-top">
            <div class="row">
              <h4>Parallel execution</h4>
            </div>
            <div class="row align-items-start">
              <div class="col-8">
                <p class="menu-title">Demo menu:</p>
                <nav class="navbar navbar-light bg-light">
                  <div class="container-fluid">
                    <div class="navbar-collapse">
                      <ul class="navbar-nav" id="demo-menu">
                        <li class="nav-item dropdown">
                          <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >parent item
                          </a>
                          <ul class="dropdown-menu" id="demo-parent-li"></ul>
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
                  disabled
                >
                  Extend demo menu
                </button>
              </div>
            </div>
          </div>
          <div class="card-body border-top">
            <div class="row">
              <h4>Serial execution</h4>
            </div>
            <form id="calc-price">
              <div class="row align-items-end">
                <div class="col-8">
                  <label class="form-label currency-box" for="price"
                    >Demo price:
                  </label>
                  <div class="input-group">
                    <span class="input-group-text">€</span>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      class="form-control currency"
                    />
                  </div>
                  <p>Cost: € <span id="demo-cost"></span></p>
                </div>
                <div class="col-4 d-grid py-2">
                  <button class="btn btn-primary extend" disabled>
                    Calculate cost
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="card-body border-top">
            <div class="row">
              <h4>Handover</h4>
            </div>
            <form id="display-img">
              <div class="row align-items-end">
                <div class="col-8">
                  <label class="form-label"
                    >Image url:
                    <input type="text" name="img-url" class="form-control" />
                  </label>
                </div>
                <div class="col-4 d-grid py-2">
                  <button class="btn btn-primary extend" disabled>
                    Display image
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="card-body border-top" id="img-viewer"></div>
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
export default {
  components: {
    installPlugin,
    UninstallPlugin,
    UpdatePlugins,
    ActivatePlugins,
  },
};
</script>
