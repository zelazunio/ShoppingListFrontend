<template>
  <div id="app">
    <b-container class="h-100 d-flex justify-content-center p-0">
      <menu-bar/>
      <b-row
        align-v="center"
        class="
          align-self-center
          w-100
          contentContainerBackground
          contentContainerBorders
          contentContainerHeight
        "
      >
        <b-col class="h-100 pt-2 pb-2 d-flex flex-column">
          <b-row class="pl-4 pr-2 pt-1 pb-1">
            <b-col class="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
              <b-form-checkbox
                id="doneCheckbox"
                v-model="filterNotDoneOnly"
                name="doneCheckbox"
                :value="true"
                :unchecked-value="false"
                class="noselect"
              >
                <span>{{ $t("Pending only") }}</span>
              </b-form-checkbox>
            </b-col>
            <b-col
              class="
                d-flex
                flex-nowrap
                col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5
                pt-1
              "
            >
              <filter-input
                :value="categoryFilter"
                :options="categories"
                listName="categoryFilter"
                :placeholder="$t('Categories')"
                :disabled="listItemsLoading"
                key="categoryFilter"
                @input="
                  (p) => {
                    categoryFilter = p;
                  }
                "
              />
            </b-col>
            <b-col
              class="
                d-flex
                flex-nowrap
                col-12 col-sm-12 col-md-4 col-lg-5 col-xl-5
                pt-1
              "
            >
              <filter-input
                :value="vendorFilter"
                :options="vendors"
                listName="vendorFilter"
                :placeholder="$t('Vendors')"
                :disabled="listItemsLoading"
                key="vendorFilter"
                @input="
                  (p) => {
                    vendorFilter = p;
                  }
                "
              />
            </b-col>
          </b-row>
          <b-overlay
            :show="listItemsLoading"
            variant="transparent"
            blur="8px"
            class="h-100"
            style="overflow-y: auto; overflow-x: hidden"
            id="thisOneOverflows"
          >
            <b-row class="flex-grow-1">
              <b-col>
                <list-item-renderer
                  v-for="listItem in listItemsFiltered"
                  :key="listItem._id"
                  :list-item="listItem"
                  :disabled="itemPutPending"
                  @changedDoneState="putItem"
                />
              </b-col>
            </b-row>
          </b-overlay>
          <b-row>
            <b-col>
              <b-row>
                <b-col class="d-flex justify-content-center">
                  <b-btn
                    pill
                    size="lg"
                    variant="success"
                    @click="openAddNewItem"
                  >
                    <b-icon-plus-circle></b-icon-plus-circle>
                  </b-btn>
                </b-col>
                <b-col></b-col>
                <b-col class="d-flex justify-content-center">
                  <b-btn
                    pill
                    size="lg"
                    variant="danger"
                    @click="openDeleteDoneDialog"
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
                    <b-icon-list/>
                  </b-btn>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!-- Delete Items Dialog -->
    <b-modal
      id="deleteDoneDialog"
      centered
      :title="$t('Confirm action')"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-overlay :show="itemsDeletePending" variant="transparent" blur="8px">
        {{ $t("deleteQuestionPart1") }} <b>{{ doneItemsIdsTable.length }}</b>
        {{ $t("deleteQuestionPart2") }} <b>{{ $t("deleteQuestionPart3") }}</b> ?
      </b-overlay>
      <template #modal-footer="{ cancel }">
        <b-btn
          variant="primary"
          @click="deleteDoneItems"
          :disabled="itemsDeletePending"
          >{{ $t("Delete") }}</b-btn
        >
        <b-btn @click="cancel()" :disabled="itemsDeletePending">{{
          $t("Cancel")
        }}</b-btn>
      </template>
    </b-modal>
    <!-- Add New Item Dialog -->
    <b-modal
      id="addNewItemDialog"
      centered
      :title="$t('Add new item')"
      header-bg-variant="primary"
      header-text-variant="light"
      hide-header-close
      no-close-on-backdrop
      no-close-on-esc
    >
      <b-row class="p-0">
        <b-col class="p-0">
          <b-container fluid class="p-0">
            <b-overlay :show="itemPostPending" variant="transparent" blur="8px">
              <b-col>
                <list-item-renderer-editable
                  :listItem="newItem"
                  :categories="categories"
                  :vendors="vendors"
                  @formValid="
                    (valid) => {
                      addItemsSaveButtonEnabled = valid;
                    }
                  "
                />
              </b-col>
            </b-overlay>
          </b-container>
        </b-col>
      </b-row>
      <template #modal-footer="{ cancel }">
        <b-btn
          style="margin-right: 2em"
          variant="primary"
          :disabled="!addItemsSaveButtonEnabled"
          @click.prevent="postItems"
        >
          <b-icon-pencil-fill></b-icon-pencil-fill>
        </b-btn>

        <b-btn @click="cancel()" :disabled="itemPostPending">
          <b-icon-backspace-fill></b-icon-backspace-fill>
        </b-btn>
      </template>
    </b-modal>
    <error-dialog />
  </div>
</template>

<script>
import ListItemRenderer from "./components/ListItemRenderer";
import ListItem from "@/classes/ListItem";
import ListItemRendererEditable from "./components/ListItemRendererEditable";
import FilterInput from "@/components/FilterInput.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";
import MenuBar from "./components/MenuBar.vue";

export default {
  name: "App",
  components: {
    ListItemRenderer,
    ListItemRendererEditable,
    FilterInput,
    ErrorDialog,
    MenuBar
},
  data() {
    return {
      listItems: [],
      newItem: new ListItem(),
      filterNotDoneOnly: true,
      vendorFilter: "",
      categoryFilter: "",
      listItemsLoading: false,
      itemsToDelete: null,
      deletingItems: true,
      itemPostPending: false,
      itemPutPending: false,
      itemsDeletePending: false,
      addItemsSaveButtonEnabled: false,
      menuBarVisibility: false,
    };
  },
  mounted() {
    this.getItems();
    try {
      let langMemory = localStorage.getItem("shoppingListJzLocale");
      if (langMemory) this.setLang(langMemory);
    } catch {
      console.debug("Couldn't find and set your language");
    }
  },
  computed: {
    listItemsFiltered() {
      let result = [];
      result = this.listItems
        .filter((el) => {
          let logicalResult = true;
          logicalResult &= this.filterNotDoneOnly ? !el.done : true;
          logicalResult &=
            this.categoryFilter.length > 0
              ? el.category == this.categoryFilter
              : true;
          logicalResult &=
            this.vendorFilter.length > 0
              ? el.vendor == this.vendorFilter
              : true;
          return logicalResult;
        })
        .sort((el) => {
          let result = 0;
          if (el.done) result = -1;
          else result = 1;
          return result;
        });
      return result;
    },
    categories() {
      let result = Array.from(
        new Set(
          this.listItems
            .map((item) => (item.category ? item.category : null))
            .filter((item) => item)
            .filter((item) => item !== this.$t("OtherCategory"))
            .sort()
        )
      );
      result.unshift(this.$t("OtherCategory"));
      return result;
    },
    vendors() {
      let result = Array.from(
        new Set(
          this.listItems
            .map((item) => (item.vendor ? item.vendor : null))
            .filter((item) => item)
            .filter((item) => item !== this.$t("OtherVendor"))
            .sort()
        )
      );
      result.unshift(this.$t("OtherVendor"));
      return result;
    },
    doneItemsIdsTable() {
      return this.listItems.filter((item) => item.done).map((item) => item._id);
    },
  },
  methods: {
    
    getItems() {
      this.listItemsLoading = true;
      fetch(`${process.env.VUE_APP_API_URL}/items`)
        .then((res) => res.json())
        .then((data) => {
          this.listItems = data;
          this.listItemsLoading = false;
        })
        .catch(() => {
          this.$store.commit("addError", "Couldn't fetch data from database.");
          this.listItemsLoading = false;
        });
    },
    openAddNewItem() {
      this.newItem = new ListItem();
      this.$bvModal.show("addNewItemDialog");
    },
    postItem() {
      let object = { ...this.newItem };
      this.apiPost("/item", "itemAdded", object);
    },
    postItems() {
      let object = { ...this.newItem };
      delete object.item;
      object.items = this.newItem.item;
      this.apiPost("/items", "itemsAdded", object);
    },
    apiPost(url, responseKeyword, object) {
      this.itemPostPending = true;
      fetch(`${process.env.VUE_APP_API_URL}${url}`, {
        method: "post",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(object),
        cache: "default",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data[responseKeyword]) console.log("error adding element");
          else {
            this.getItems();
            this.$bvModal.hide("addNewItemDialog");
          }
          this.itemPostPending = false;
        })
        .catch(() => {
          this.$store.commit("addError", "Couldn't write data to database.");
          this.$bvModal.hide("addNewItemDialog");
        });
    },
    openDeleteDoneDialog() {
      this.itemsToDelete = this.listItems
        .filter((item) => item.done)
        .map((item) => item._id);
      this.$bvModal.show("deleteDoneDialog");
    },
    deleteDoneItems() {
      this.itemsDeletePending = true;
      fetch(`${process.env.VUE_APP_API_URL}/items`, {
        method: "delete",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ ids: this.doneItemsIdsTable }),
      })
        .then((response) => response.json())
        .then(() => {
          this.itemsDeletePending = false;
          this.$bvModal.hide("deleteDoneDialog");
          this.getItems();
        })
        .catch(() => {
          this.$store.commit("addError", "Couldn't write data to database.");
          this.itemsDeletePending = false;
        });
    },
    putItem(item) {
      this.itemPutPending = true;
      fetch(`${process.env.VUE_APP_API_URL}/item`, {
        method: "put",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ _id: item._id, done: !item.done }),
        cache: "default",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.itemUpdated)
            this.$store.commit("addError", "Error while updating element.");
          else {
            item.done = !item.done;
          }
          this.itemPutPending = false;
        })
        .catch(() => {
          this.$store.commit("addError", "Error while updating element.");
          this.itemPutPending = false;
        });
    },
  
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: lightgray;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.contentContainerBackground {
  background-color: rgba(255, 255, 255, 0.55);
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
<style lang="sass">
@import "node_modules/bootstrap/scss/_functions.scss"
@import "node_modules/bootstrap/scss/_variables.scss"
@import "node_modules/bootstrap/scss/mixins/_breakpoints.scss"

.contentContainerBorders
  border: 10px solid rgba(255, 255, 255, 0.6)
  border-radius: 20px

.contentContainerHeight
  height: 75% !important

@include media-breakpoint-only(xs)
  .contentContainerBorders
    border: none
    border-radius: 0

  .contentContainerHeight
    height: 100% !important

.invalid-feedback
  background: rgba(255,255,255,0.7)
  border: 1px dotted red
  padding: 4px
  margin-top: 0 !important
</style>