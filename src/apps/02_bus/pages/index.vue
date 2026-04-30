<template>
  <!-- <h1>Hello World!</h1> -->
  <v-app id="inspire">
    <v-app-bar app>
      <router-link to="/">
        <U2wareAvatar></U2wareAvatar>
      </router-link>
      <v-toolbar-title>{{ $t("frontend.index.title") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn test variant="elevated" color="error" @click="start">
        <v-icon>mdi-account</v-icon> &nbsp;시작하기
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="d-flex gr-4 py-8 flex-grow-1 flex-column">
        <v-carousel height="600" show-arrows="hover" cycle hide-delimiters>
          <v-carousel-item v-for="(src, i) in items" :key="i" :src="src" reverse-transition="cross-scale" transition="cross-scale" cover></v-carousel-item>
        </v-carousel>
      </div>
    </v-main>
    <U2wareFooter></U2wareFooter>
  </v-app>
</template>
<script>
const x = "[/]";
import $oauth2Server from "@@/assets/apis/oauth2-server";

export default{
  data: () => ({
    items: [
      'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    ],
    selectedGroup: 'Transactions'
  }),

  computed: {

  },

  methods: {
    start(){
      $oauth2Server.oauth2.available()
        .then((r) => {
          console.log(x, "start()", 1, r);
          if(true == r){
            return $oauth2Server.oauth2.userinfo()
          }
        })
        .then((r) => {
          console.log(x, "start()", 2, r);
          this.$router.push(`/contents`);
        })
        .catch((r) => {
          console.log(x, "start()", 3, r);
          this.$router.push(`/accounts/login`);
        });
    },
  },

  watch: {

  },

  mounted(){

  },
};
</script>