<template>
  <v-app id="inspire">
    <v-app-bar app>
      <router-link to="/">
        <U2wareAvatar></U2wareAvatar>
      </router-link>

      <v-toolbar-title>
        {{ $t("frontend.index.title") }} {{ subtitle }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" variant="elevated" color="primary">
            <v-icon>mdi-account</v-icon> {{ username }}
          </v-btn>
        </template>
        <v-list nav>
          <v-list-item
            prepend-icon="mdi-account-edit"
            :title="$t('accounts.account.title')"
            :to="isAdmin ? '/contents/accounts' : '/contents/userAccount'"
          >
          </v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            :title="$t('accounts.logout.title')"
            @click="logout"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <U2wareFooter></U2wareFooter>

    <v-navigation-drawer permanent v-model="drawer">
      <v-list nav>
        <v-list-subheader>API</v-list-subheader>
        <v-divider></v-divider>
        <v-list-item to="/contents/buses"> {{ $t("frontend.contents.buses.title") }}</v-list-item>
        <v-list-item to="/contents/busDrivers"> {{ $t("frontend.contents.busDrivers.title") }} </v-list-item>
        <v-list-item to="/contents/busRoutes"> {{ $t("frontend.contents.busRoutes.title") }} </v-list-item>
        <v-list-item to="/contents/busStops"> {{ $t("frontend.contents.busStops.title") }} </v-list-item>
        <v-divider></v-divider>

        <v-list-subheader v-if="isAdmin">Stomp</v-list-subheader>
        <v-list-item v-if="isAdmin" to="/contents/repairs"> {{ $t("frontend.contents.repairs.title") }} </v-list-item>
        <v-list-item v-if="isAdmin" to="/contents/sessions"> {{ $t("frontend.contents.sessions.title") }} </v-list-item>
        <v-divider></v-divider>
        <template v-if="isAdmin">
          <v-list-subheader>Accounts</v-list-subheader>
          <v-list-item to="/contents/accounts">{{ $t("frontend.contents.accounts.title") }}</v-list-item>
        </template>
        <template v-else>
          <v-list-subheader>Account</v-list-subheader>
          <v-list-item to="/contents/userAccount">{{ $t("frontend.contents.account.title") }}</v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const x = "[/contents]";
import $oauth2Server from "@@/assets/apis/oauth2-server";
import $busServer from "@@/assets/apis/bus-server";
import $common from "@@/assets/stores/common";

export default {
  data: () => ({
    drawer: true,
    isAdmin: false,
    username : null,
  }),

  computed: {
    subtitle: $common.computed.subtitle,
    userinfo : $common.computed.userinfo,
  },

  methods: {
    logout() {
      let before = this.$t("accounts.logout.title");
      let after = this.$t("accounts.logoff.title");

      this.$dialog
        .confirm(before)
        .then((r) => {
          console.log(x, "logout()", 1, r);
          return $oauth2Server.oauth2.logout();
        })
        .then((r) => {
          console.log(x, "logout()", 2, r);
          return this.$dialog.alert(after);
        })
        .then((r) => {
          console.log(x, "logout()", 3, r);
          this.$router.push("/");
        })
        .catch((r) => {
            console.log(x, "logout()", 4, r);
            this.$router.push("/");
        })
        ;
    },
  },

  mounted() {

    $busServer.oauth2
      .userinfo("ROLE_ADMIN")
      .then((r) => {
        console.log(x, "mounted()", 1, r);
        $common.computed.userinfo.set(r);
        this.username = r.username;
        this.isAdmin = r["ROLE_ADMIN"];
        return $busServer.oauth2.available();
      })
      .then((r) => {
        console.log(x, "mounted()", 2, r);
        if(true == r && this.username == 'Anonymous') { 
          throw r;
        }
      })
      .catch((r) => {
        console.log(x, "mounted()", 3, r);
        $common.computed.userinfo.set(undefined);
        return $oauth2Server.oauth2.logout().then(()=>{
          this.$router.push(`/`);
        })
      });
  },
};
</script>
