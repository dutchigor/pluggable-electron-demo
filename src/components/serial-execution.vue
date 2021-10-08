<template>
  <div class="row">
    <h4>Serial execution</h4>
  </div>
  <form id="calc-price" @submit.prevent="calculateCost">
    <div class="row align-items-end">
      <div class="col-8">
        <label class="form-label currency-box" for="price">Demo price: </label>
        <div class="input-group">
          <span class="input-group-text">€</span>
          <input
            type="number"
            step="0.01"
            name="price"
            class="form-control currency"
          />
        </div>
        <p>
          Cost: € <span id="demo-cost">{{ cost }}</span>
        </p>
      </div>
      <div class="col-4 d-grid py-2">
        <button class="btn btn-primary extend" :disabled="!activated">
          Calculate cost
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { extensionPoints } from "pluggable-electron";

export default {
  props: {
    activated: Boolean,
  },
  setup() {
    // Set a default cost
    const cost = ref(0);

    // Set the cost, calculated in multiple steps by the plugins
    async function calculateCost(e) {
      cost.value = await extensionPoints.executeSerial(
        "calc-price",
        e.target.elements.price.value
      );
    }

    return { cost, calculateCost };
  },
};
</script>

<style>
</style>