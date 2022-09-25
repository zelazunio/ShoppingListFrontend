<template>
  <shopping-list-dialog
    title="Confirm action"
    header-bg-variant="danger"
    header-text-variant="light"
    :show-overlay="itemsDeletePending"
    id="deleteDoneDialog"
  >
    <template v-slot:dialogBody>
      {{ $t("deleteQuestionPart1") }} <b>{{ doneItemsIdsTableLength }}</b>
      {{ $t("deleteQuestionPart2") }} <b>{{ $t("deleteQuestionPart3") }}</b> ?
    </template>
    <template v-slot:dialogButtons>
      <b-btn
        variant="primary"
        @click="$emit('deleteDoneItems')"
        :disabled="itemsDeletePending"
      >
        <b-icon-trash />
      </b-btn>
      <b-btn @click="$bvModal.hide('deleteDoneDialog')">
        <b-icon-backspace-fill></b-icon-backspace-fill>
      </b-btn>
    </template>
  </shopping-list-dialog>
</template>

<script>
import ShoppingListDialog from "@/components/ShoppingListDialog";

export default {
  name: "DeleteItemsDialog",
  components: { ShoppingListDialog },
  props: {
    itemsDeletePending: { type: Boolean, reqired: true },
    doneItemsIdsTableLength: { type: Number, required: true },
  },
};
</script>
