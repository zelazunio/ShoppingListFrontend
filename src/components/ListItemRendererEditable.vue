<template>
  <b-container fluid class="d-flex">
    <b-row class="flex-grow-1 d-flex flex-column p-0">
      <b-col class="pl-0 pr-0" style="min-height: 6rem">
        <b-form-input
          v-model="listItem.item"
          type="text"
          id="inputItem"
          :placeholder="$t(textPlaceholder)"
          :state="itemState"
          autofocus
        />
        <b-form-invalid-feedback id="inputItem" class="p-0 m-0"
          >{{ $t("InputMinLengthMsg") }}</b-form-invalid-feedback
        >
        <b-form-text id="input-live-help">{{ $t("ItemMsg") }}</b-form-text>
      </b-col>
      <b-col class="p-0" style="min-height: 5rem">
        <b-row class="d-flex flex-nowrap">
          <b-col class="flex-grow-1">
            <b-form-input
              v-model="listItem.category"
              id="inputCategory"
              list="categoryList"
              v-bind="$attrs"
              v-on="$listeners"
              :placeholder="$t(categoryPlaceholder)"
              :state="categoryState"
            />
            <b-form-invalid-feedback id="inputCategory"
              >{{ $t("InputMinLengthMsg") }}</b-form-invalid-feedback
            >
            <b-form-datalist id="categoryList" :options="categories" />
          </b-col>
          <b-col class="flex-grow-0">
            <b-btn
              size="sm"
              pill
              variant="outline-danger"
              class="ml-1 mr-1"
              @click.prevent="listItem.category = ''"
            >
              <b-icon-x-circle></b-icon-x-circle>
            </b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="p-0" style="min-height: 5rem">
        <b-row class="d-flex flex-nowrap">
          <b-col class="flex-grow-1">
            <b-form-input
              v-model="listItem.vendor"
              id="inputVendor"
              list="vendorList"
              v-bind="$attrs"
              v-on="$listeners"
              :placeholder="$t(vendorPlaceholder)"
              :state="vendorState"
            />
            <b-form-invalid-feedback id="inputVendor"
              >{{ $t("InputMinLengthMsg") }}</b-form-invalid-feedback
            >
            <b-form-datalist id="vendorList" :options="vendors" />
          </b-col>
          <b-col class="flex-grow-0">
            <b-btn
              size="sm"
              pill
              variant="outline-danger"
              class="ml-1 mr-1"
              @click.prevent="listItem.vendor = ''"
            >
              <b-icon-x-circle></b-icon-x-circle>
            </b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ListItemRendererEditable",
  props: {
    listItem: { type: Object, required: true },
    textPlaceholder: { type: String, default: "Item" },
    categoryPlaceholder: { type: String, default: "Category" },
    vendorPlaceholder: { type: String, default: "Vendor" },
    categories: { type: Array, default: () => [] },
    vendors: { type: Array, default: () => [] },
  },
  data() {
    return {
      itemEditionStarted: false,
      categoryEditionStarted: false,
      vendorEditionStarted: false,
    };
  },
  computed: {
    itemState() {
      return this.itemEditionStarted ? this.listItem.item.length > 2 : null;
    },
    categoryState() {
      return this.categoryEditionStarted
        ? this.listItem.category.length > 2
        : null;
    },
    vendorState() {
      return this.vendorEditionStarted ? this.listItem.vendor.length > 2 : null;
    },
    saveButtonEnabled() {
      return this.itemState && this.categoryState && this.vendorState;
    },
  },
  watch: {
    "listItem.item": function () {
      if (!this.itemEditionStarted && this.listItem.item.length > 0)
        this.itemEditionStarted = true;
      this.emitFormValidEvent();
    },
    "listItem.category": function () {
      if (!this.categoryEditionStarted && this.listItem.category.length > 0)
        this.categoryEditionStarted = true;
      this.emitFormValidEvent();
    },
    "listItem.vendor": function () {
      if (!this.vendorEditionStarted && this.listItem.vendor.length > 0)
        this.vendorEditionStarted = true;
      this.emitFormValidEvent();
    },
  },
  methods: {
    emitFormValidEvent() {
      this.$emit("formValid", this.saveButtonEnabled);
    },
  },
};
</script>
