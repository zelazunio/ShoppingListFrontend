<template>
  <b-container fluid class="pt-1 pb-1 pr-0  ">
    <b-row>
      <b-col class="col-12 d-flex flex-nowrap">
        <b-form-input :value="listItem.item" class="mr-2" type="text" :disabled="true" />
        <b-btn
          pill
          size="sm"
          :variant="listItem.done ? 'success' : 'primary'"
          @click.prevent="$emit('changedDoneState', listItem)"
          :disabled="$attrs.disabled"
        >
          <b-icon-check></b-icon-check>
        </b-btn>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ListItemRenderer",
  props: {
    listItem: { type: Object, required: true },
    textPlaceholder: { type: String, default: "Item" },
  },
};
</script>
<style lang="sass" scoped>
@import "node_modules/bootstrap/scss/_functions.scss"
@import "node_modules/bootstrap/scss/_variables.scss"
@import "node_modules/bootstrap/scss/mixins/_breakpoints.scss"

@include media-breakpoint-only(xs)
  .buttonSizeXS
    padding: 0.25rem 0.25rem
    font-size: 0.875rem
    border-radius: 20rem !important
</style>