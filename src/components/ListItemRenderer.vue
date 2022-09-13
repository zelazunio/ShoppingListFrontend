<template>
  <b-container fluid class="pt-1 pb-1">
    <b-row>
      <b-col class="col-12 d-flex flex-nowrap">
        <b-form-input :value="listItem.item" class="mr-2" type="text" :disabled="true" />
        <b-btn
          pill
          size="sm"
          :variant="listItem.done ? 'success' : 'primary'"
          @click.prevent="markDone"
          :disabled="$attrs.disabled || listItem.done"
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
  methods: {
    markDone() {
      fetch(`${process.env.VUE_APP_API_URL}/item`, {
        method: "put",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ _id: this.listItem._id, done: true }),
        cache: "default",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.itemAUpdated)
            this.$store.commit("addError", "Error while updating element.");
          else {
            this.listItem.done = true;
          }
        })
        .catch(() => {
          this.$store.commit("addError", "Error while updating element.");
        });
    },
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