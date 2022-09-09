<template>
  <b-container fluid class="p-3 d-flex">
    <b-row class="flex-grow-1">
      <b-col
        class="col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 p-1"
        order-md="1"
        order-lg="1"
        order-xl="1"
      >
        <b-form-input
          v-model="listItem.item"
          type="text"
          id="inputItem"
          :placeholder="textPlaceholder"
          :state="itemState"
        />
        <b-form-invalid-feedback id="inputItem"
          >Enter at least 3 letters</b-form-invalid-feedback
        >
      </b-col>
      <b-col
        class="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 p-1"
        order-md="3"
        order-lg="1"
        order-xl="1"
      >
        <b-row class="d-flex flex-nowrap">
          <b-col class="flex-grow-1">
            <b-form-input
              v-model="listItem.category"
              id="inputCategory"
              list="categoryList"
              v-bind="$attrs"
              v-on="$listeners"
              :placeholder="categoryPlaceholder"
              :state="categoryState"
            />
            <b-form-invalid-feedback id="inputCategory"
              >Enter at least 3 letters</b-form-invalid-feedback
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
      <b-col
        class="
          col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3
          p-1
          d-flex
          flex-nowrap
        "
        order-md="4"
        order-lg="1"
        order-xl="1"
      >
        <b-row class="d-flex flex-nowrap">
          <b-col class="flex-grow-1">
            <b-form-input
              v-model="listItem.vendor"
              id="inputVendor"
              list="vendorList"
              v-bind="$attrs"
              v-on="$listeners"
              :placeholder="vendorPlaceholder"
              :state="vendorState"
            />
            <b-form-invalid-feedback id="inputVendor"
              >Enter at least 3 letters</b-form-invalid-feedback
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
      <b-col
        class="
          col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2
          p-1
          d-flex
          justify-content-center
        "
        align-self="start"
        order-md="2"
        order-lg="1"
        order-xl="1"
      >
        <b-btn
          pill
          variant="primary"
          :disabled="!saveButonEnabled"
          @click.prevent="$emit('saveItem')"
        >
          <b-icon-pencil-fill></b-icon-pencil-fill>
        </b-btn>
        <b-btn pill variant="danger" @click.prevent="$emit('discardItem')">
          <b-icon-backspace-fill></b-icon-backspace-fill>
        </b-btn>
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
    saveButonEnabled() {
      return this.itemState && this.categoryState && this.vendorState;
    },
  },
  watch: {
    "listItem.item": function () {
      if (!this.itemEditionStarted && this.listItem.item.length > 0)
        this.itemEditionStarted = true;
    },
    "listItem.category": function () {
      if (!this.categoryEditionStarted && this.listItem.category.length > 0)
        this.categoryEditionStarted = true;
    },
    "listItem.vendor": function () {
      if (!this.vendorEditionStarted && this.listItem.vendor.length > 0)
        this.vendorEditionStarted = true;
    },
  },
};
</script>
