<template>
  <b-row>
    <b-col class="d-flex justify-content-center">
      <b-btn pill size="lg" variant="success" @click="$emit('openAddNewItem')">
        <b-icon-plus-circle></b-icon-plus-circle>
      </b-btn>
    </b-col>
    <b-col></b-col>
    <b-col class="d-flex justify-content-center">
      <b-btn
        pill
        size="lg"
        variant="danger"
        @click="$emit('openDeleteDoneDialog')"
        :disabled="deleteButtonDisabled"
      >
        <b-icon-trash></b-icon-trash>
      </b-btn>
    </b-col>
    <b-col></b-col>
    <b-col class="d-flex justify-content-center">
      <b-btn
        pill
        size="lg"
        variant="primary"
        @click="$store.commit('changeMenuBarVisibility')"
      >
        <b-icon-list />
      </b-btn>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Buttons",
  props: {
    deleteButtonDisabled: {type: Boolean, required: true}
  }

};
</script>
