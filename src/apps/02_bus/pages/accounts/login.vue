<template>
  <v-container class="text-center">
    <v-progress-circular
      color="primary"
      indeterminate
      v-if="providers == undefined"
    >
  </v-progress-circular>
  <v-row
    v-for="provider in providers"
    :key="provider.name"
    class="my-2"
    align="center"
    justify="center"
    >
    <v-col cols="12" md="6">
      <v-btn
        variant="outlined"
        block
        size="x-large"
        class="d-flex align-center justify-center login-btn"
        @click="login(provider.uri)"
      >
        <span v-if="provider.name.toLowerCase().includes('github')" class="mr-2" style="display: flex; align-items: center;">
          <v-icon size="28" color="#333333">mdi-github</v-icon>
        </span>
        <span v-else-if="provider.name.toLowerCase().includes('kakao')" class="mr-2" style="display: flex; align-items: center;">
          <v-icon size="28" color="#FEE500">mdi-alpha-k-circle</v-icon>
        </span>
        <span v-else-if="provider.name.toLowerCase().includes('google')" class="mr-2" style="display: flex; align-items: center;">
          <v-icon size="28" color="#4285F4">mdi-google</v-icon>
        </span>
        <span v-else-if="provider.name.toLowerCase().includes('naver')" class="mr-2" style="display: flex; align-items: center;">
          <v-icon size="28" color="#03C75A">mdi-alpha-n-box</v-icon>
        </span>
        <span v-else-if="provider.name.toLowerCase().includes('u2ware')" class="mr-2" style="display: flex; align-items: center;">
          <img src="@/components/U2wareLogo.png" alt="U2ware Logo" style="height: 28px; width: 28px;" />
        </span>
        <span>
          {{ $t("accounts.login.provider", [provider.name]) }}
        </span>
      </v-btn>
    </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
  .login-btn {
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.2s;
  }
  .login-btn:hover{
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
</style>
<script>
const x = "[/accounts/login]";
import $oauth2Server from "@@/assets/apis/oauth2-server";
export default {
  data: () => ({
    username: undefined,
    providers: [],
  }),

  computed: {

  },

  methods: {

    login(uri) {
      let callback = `${window.location.origin}/accounts/logon`;
      let href = uri + callback;
      console.log(x, "login()", href);
      window.location.href = href;
    },
  },

  watch: {
    
  },

  mounted() {

    Promise.resolve()
      .then((r) => {
        console.log(x, "mounted()", 1);
        return $oauth2Server.oauth2.userinfo();
      })
      .then((r) => {
        console.log(x, "mounted()", 2);
        this.$router.push("/contents");
      })
      .catch((r) => {
        console.log(x, "mounted()", 3);
        return $oauth2Server.oauth2.providers();
      })
      .then((r) => {
        console.log(x, "mounted()", 4, r);
        this.providers = r;
        if(this.providers.length == 1) {
          this.login(this.providers[0].uri);
        }
      })
      .catch((r) => {
        this.$router.push("/");
      })
  },
};
</script>
