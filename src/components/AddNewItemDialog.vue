<template>
  <shopping-list-dialog
    title="Add new item"
    header-bg-variant="primary"
    header-text-variant="light"
    :show-overlay="itemPostPending"
    id="addNewItemDialog"
  >
    <template v-slot:dialogBody>
      <list-item-renderer-editable
        :listItem="listItem"
        :categories="categories"
        :vendors="vendors"
        @formValid="
          (valid) => {
            addItemsSaveButtonDisabled = !valid;
          }
        "
      />
    </template>
    <template v-slot:dialogButtons>
      <b-btn
        style="margin-right: 2em"
        variant="primary"
        :disabled="addItemsSaveButtonDisabled"
        @click.prevent="$emit('postItems')"
      >
        <b-icon-pencil-fill></b-icon-pencil-fill>
      </b-btn>

      <b-btn
        @click="$bvModal.hide('addNewItemDialog')"
        :disabled="itemPostPending"
      >
        <b-icon-backspace-fill></b-icon-backspace-fill>
      </b-btn>
    </template>
  </shopping-list-dialog>
</template>

<script>
import ListItemRendererEditable from "@/components/ListItemRendererEditable";
import ShoppingListDialog from "./ShoppingListDialog.vue";

export default {
  name: "AddNewItemDialog",
  props: {
    itemPostPending: { type: Boolean, required: true },
    listItem: { type: Object, required: true },
    categories: { type: Array, required: true },
    vendors: { type: Array, required: true },
  },
  components: {
    ListItemRendererEditable,
    ShoppingListDialog,
  },
  data() {
    return {
      addItemsSaveButtonDisabled: true,
    };
  },
};
</script>
