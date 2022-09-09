<template>
  <b-container fluid class="pt-1 pb-1">
    <b-row>
      <b-col class="col-xs-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
        <b-form-input
          :value="listItem.item"
          type="text"
          :disabled="true"
        />
      </b-col>
      <b-col class="col-xs-12 col-sm-12 col-md-3 col-lg-2 col-xl-2">
        <b-btn pill :variant="listItem.done ? 'success' : 'primary'" @click.prevent="markDone" :disabled="$attrs.disabled || listItem.done">
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
      fetch("http://localhost:3000/item", {
        method: "put",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({_id: this.listItem._id, done: true}),
        cache: "default",
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.itemAUpdated) console.log("error updating element");
          else {
           this.listItem.done = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
<style>
</style>