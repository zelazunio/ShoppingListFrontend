<template>
  <b-modal
    :id="id"
    centered
    :title="$t(title)"
    hide-header-close
    no-close-on-backdrop
    no-close-on-esc
    v-bind="$attrs"
    v-on="$listeners"
  >
  <template #modal-title>
    {{ $t(title) }}
  </template>
    <b-overlay :show="showOverlay" variant="transparent" blur="8px">
      <slot name="dialogBody">Dialog body should go here...</slot>    
    </b-overlay>
    <template #modal-footer>
        <slot name="dialogButtons">Dialog buttons should go here...</slot>
    </template> 
  </b-modal>
</template>

<script>
export default {
  name: "ShoppingListDialog",
  props: {
    id: {type: String, required: true},
    title: {type: String, default: "Dialog"},
    showOverlay: {type: Boolean, default: false}
  }
};
</script>

<style>
</style>