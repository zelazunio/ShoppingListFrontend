<template>
  <b-modal
    id="errorDialog"
    centered
    title="Error"
    header-bg-variant="danger"
    header-text-variant="light"
    hide-header-close
  >
    <b-row class="p-0 d-flex flex-vertical">
      <b-col v-for="(error, index) in $store.state.errors" :key="index">
        <b-icon-alarm-fill variant="warning"/> {{ error }} </b-col
      >
    </b-row>
    <template #modal-footer="{ ok }">
      <b-btn variant="primary" @click="closeDialog(ok)">OK</b-btn>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "ErrorDialog",
  methods: {
    closeDialog(ok) {
      this.$store.commit("clearErrors");
      ok();
    },
  },
  watch: {
    '$store.getters.errorsPresent': {
        handler: function() {
            if (this.$store.getters.errorsPresent) this.$bvModal.show('errorDialog')
            else this.$bvModal.hide('errorDialog');
        }
    }
  }
};
</script>