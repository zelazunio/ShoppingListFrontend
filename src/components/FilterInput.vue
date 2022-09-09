<template>
  <b-col class="d-flex flex-nowrap pl-0 pr-0">
    <b-form-input
      :value="value"
      id="input"
      :list="listName"
      v-bind="$attrs"
      v-on="$listeners"
      :placeholder="placeholder"
    />
    <b-form-datalist :id="listName" :options="options" />
    <b-btn
      size="sm"
      pill
      variant="outline-danger"
      class="ml-1 mr-1"
      @click.prevent="$emit('input', '')"
    >
      <b-icon-x-circle></b-icon-x-circle>
    </b-btn>
  </b-col>
</template>

<script>
export default {
  name: "FilterInput",
  props: {
    value: { type: String, required: true },
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: "" },
    listName: {type: String, required: true}
  },
};
</script>

<style>
</style>