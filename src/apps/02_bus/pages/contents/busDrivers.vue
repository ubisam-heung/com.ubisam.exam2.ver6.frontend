<template>
  <v-container class="pa-4" fluid>
    <v-card>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-card-account-details"></v-icon> &nbsp;
        {{ $t("frontend.contents.busDrivers.title") }}&nbsp;
        <!-- 
        ///////////////////////////
        // Search Field Start
        //////////////////////////
        -->
        <v-select
          class="ms-5"
          v-model="searchForm.option"
          density="compact"
          :items="config.searchOptions"
          item-title="text"
          item-value="value"
          label="Option"
          variant="solo-filled"
          flat
          hide-details
          single-line
          style="max-width: 7em"
        />
        <v-text-field
          class="ms-1"
          v-model="searchForm.keyword"
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
        <!-- 
        //////////////////////////
        // Search Field End
        //////////////////////////
        -->
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table-server
        fixed-header
        density="compact"
        :loading="loading"
        :search="config.searchBy"
        :page="1"
        :items-per-page="20"
        :sort-by="config.sortBy"
        :items-per-page-options="config.itemsPerPageOptions"
        :headers="config.headers"
        :item-value="config.itemValue"
        :items-length="entitiesTotal"
        :items="entities"
        @update:options="searchAction"
      >
        <!-- 
        //////////////////////////
        // Table Cell Template Start
        //////////////////////////
        -->
        <template v-slot:item.id="{ item }">
          <v-btn
            variant="plain"
            color="primary"
            :text="item.id"
            style="text-transform: none"
            @click="readAction(item)"
          ></v-btn>
        </template>
        <!-- 
        //////////////////////////
        // Table Cell Template End
        //////////////////////////
        -->

        <template v-slot:footer.prepend>
          <v-btn class="ms-1" text variant="elevated" @click="refreshAction">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

          <v-btn
            class="ms-1"
            text
            variant="elevated"
            color="primary"
            @click="newAction"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
        </template>
      </v-data-table-server>

      <v-dialog v-model="dialog" persistent width="800">
        <v-card
          prepend-icon="mdi-update"
          :title="$t('frontend.contents.busDrivers.title')"
          :subtitle="editForm.busDriverName"
        >
          <v-card-text>
            <v-form validate-on="eager" @update:model-value="dialogValidate">
              <!-- 
              //////////////////////////
              # Edit Form Start
              //////////////////////////
              -->
              <v-text-field
                v-model="editForm.busDriverName"
                :rules="[$rules.requried]"
                label="Name"
                placeholder="name"
                hint="........"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="editForm.busDriverLicense"
                :rules="[$rules.requried]"
                label="License"
                placeholder="license"
                hint="......."
                variant="outlined"
              ></v-text-field>
              <!-- 
              //////////////////////////
              # Edit Form End
              //////////////////////////
              -->
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="ms-5"
              variant="elevated"
              color="primary"
              text="Save"
              :disabled="!validate"
              @click="isNew ? createAction(e) : updateAction(e)"
            ></v-btn>
            <v-btn text="Cancel" @click="cancelAction"></v-btn>

            <v-spacer></v-spacer>
            <v-btn
              v-if="!isNew"
              color="error"
              text="Delete"
              variant="text"
              @click="deleteAction"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
const x = "[/contents/busDrivers]";
import $busServer from "@@/assets/apis/bus-server";
import $common from "@@/assets/stores/common";

export default {
  data: () => ({
    loading: false,
    dialog: false,
    isNew: false,
    validate: false,

    searchForm: {
      keyword: '', option: 'busAll'
    },
    editForm: {},

    entities: [],
    entitiesTotal: 0,

    config: {
      searchBy: "",
      itemsPerPageOptions: [
        { value: 10, title: "10" },
        { value: 20, title: "20" },
        { value: 50, title: "50" },
        { value: 100, title: "100" },
      ],
      searchOptions: [
        { value: 'busAll', text: '전체' },
        { value: 'busDriverName', text: '운전자' },
        { value: 'busDriverLicense', text: '라이센스' }
      ],
      /////////////////////////////////
      // Config Start
      /////////////////////////////////
      itemValue: "id",

      headers: [
        { key: "id", title: "id", align: "start" },
        { key: "busDriverName", title: "Name", align: "center" },
        { key: "busDriverLicense", title: "License", align: "end" },
      ],
      sortBy: [
        { key: "id", order: "desc" }
      ],

      initForm: {
        busDriverName: undefined,
        busDriverLicense: undefined,
      }
      /////////////////////////////////
      // Config End
      /////////////////////////////////
    },
  }),

  watch: {
    searchForm: {
      handler(e) {
        this.refreshAction();
      },
      deep: true,
    },
  },

  computed: {
    subtitle: $common.computed.subtitle,
  },

  methods: {


    ////////////////////////////////////////
    // handle....
    ////////////////////////////////////////
    handleCreate(){
      return $busServer.busDrivers.create(this.editForm);
    },
    handleRead(entity){
      return $busServer.busDrivers.read(entity);
    },
    handleUpdate(){
      return $busServer.busDrivers.update(this.editForm);
    },
    handleDelete(){
      return $busServer.busDrivers.delete(this.editForm);
    },
    handleSearch(query){
      return $busServer.busDrivers.search(this.searchForm, query);
    },
    handleEntities(res){
      this.entitiesTotal = res.page.totalElements;
      this.entities = res._embedded.busDrivers;
      return res;
    },
    handleEntity(res){
      this.editForm = res ? res : Object.assign({}, this.config.initForm);
      return res;
    },

    ////////////////////////////////////////
    //
    ////////////////////////////////////////
    dialogOpen(isNew) {
      this.dialog = true;
      this.isNew = isNew;
      return "opened";
    },
    dialogClose() {
      this.dialog = false;
      this.isNew = false;
      return "closed";
    },
    dialogValidate(r){
      this.validate = r;
    },
    
    ////////////////////////////////////////
    //
    ////////////////////////////////////////
    confirmBefore(code) {
      let msg = this.$t(`$dialog.before.${code}`);
      return this.$dialog.confirm(msg);
    },
    confirmAfter(code) {
      let msg = this.$t(`$dialog.after.${code}`);
      return this.$dialog.alert(msg);
    },
    confirmError(code) {
      let msg = this.$t(`$dialog.error.${code}`);
      return this.$dialog.alert(msg, code);
    },
    
    ////////////////////////////////////////
    //
    ////////////////////////////////////////
    actionStart(loading) {
      this.loading = true == loading ? true : false;
      return Promise.resolve();
    },
    actionEnd(refresh) {
      this.loading = false;
      if (true == refresh) {
        this.dialog = false;
        this.isNew = false;
        this.refreshAction();
      }
    },

    ////////////////////////////////////////
    //
    ////////////////////////////////////////
    refreshAction() {
      this.config.searchBy = String(Date.now());
    },

    searchAction(params) {
      this.actionStart(true)
        .then((r) => {
          return this.handleSearch(params);
        })
        .then((r) => {
          console.log(r);
          return this.handleEntities(r);
        })
        .then((r) => {
          return this.actionEnd(false);
        })
        .catch((e) => {
          return this.confirmError(e);
        })
        .catch((e) => {
          this.$router.push("/");
        });
    },

    newAction() {
      this.actionStart(true)
        .then((r) => {
          return this.handleEntity();
        })
        .then((r) => {
          return this.dialogOpen(true);
        })
        .then((r) => {
          return this.actionEnd(false);
        });
    },

    cancelAction() {
      this.actionStart(true)
        .then((r) => {
          return this.dialogClose();
        })
        .then((r) => {
          return this.handleEntity();
        })
        .then((r) => {
          return this.actionEnd(false);
        });
    },

    createAction() {
      this.confirmBefore("create")
        .then((r) => {
          return this.actionStart(true);
        })
        .then((r) => {
          return this.handleCreate();
        })
        .then((r) => {
          return this.confirmAfter("create");
        })
        .then((r) => {
          return this.handleEntity();
        })
        .then((r) => {
          return this.actionEnd(true);
        })
        .catch((r) => {
          return this.confirmError(r);
        })
        .catch((r) => {
          return this.actionEnd(true);
        });
    },

    readAction(entity) {
      this.actionStart(true)
        .then((r) => {
          return this.handleRead(entity);
        })
        .then((r) => {
          return this.handleEntity(r);
        })
        .then((e) => {
          return this.dialogOpen(false);
        })
        .then((e) => {
          return this.actionEnd(false);
        })
        .catch((e) => {
          return this.confirmError(e);
        })
        .catch((e) => {
          return this.actionEnd(true);
        });
    },

    updateAction() {
      this.confirmBefore("update")
        .then((r) => {
          return this.actionStart(true);
        })
        .then((r) => {
          return this.handleUpdate();
        })
        .then((r) => {
          return this.confirmAfter("update");
        })
        .then((r) => {
          return this.handleEntity();
        })
        .then((r) => {
          return this.actionEnd(true);
        })
        .catch((r) => {
          return this.confirmError(r);
        })
        .catch((r) => {
          return this.actionEnd(true);
        });
    },

    deleteAction() {
      this.confirmBefore("delete")
        .then((r) => {
          return this.actionStart(true);
        })
        .then((r) => {
          return this.handleDelete();
        })
        .then((r) => {
          return this.confirmAfter("delete");
        })
        .then((r) => {
          return this.handleEntity();
        })
        .then((r) => {
          return this.actionEnd(true);
        })
        .catch((r) => {
          return this.confirmError(r);
        })
        .catch((r) => {
          return this.actionEnd(true);
        });
    },
  },

  mounted() {
    this.subtitle = x;
  },
};
</script>
