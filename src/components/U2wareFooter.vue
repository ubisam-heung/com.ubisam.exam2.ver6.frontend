<template>
  <v-footer app
    class="d-flex flex-column" color="teal" rounded="lg">
    <div class="d-flex w-100 align-center px-4 py-2">
      <strong>(주) 유비샘-조흥재연구원</strong>

      <div class="d-flex ga-2 ms-auto">
        <v-btn
          v-for="item in icons"
          :key="item.icon"
          :icon="item.icon"
          size="small"
          variant="plain"
          :href="item.url"
          target="_blank"
          rel="noopener"
        ></v-btn>
      </div>
    </div>

    <div class="px-4 py-2 bg-surface-variant text-center w-100 rounded-lg">
      <strong>Copyright &copy; {{ new Date().getFullYear() }} &nbsp;&nbsp; (주) 유비샘</strong>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
        { icon: 'mdi-microphone-message', url: 'https://www.notion.so/4-3181dd99f25d80c69513dc2934fabece#3181dd99f25d809cbaedc66d8b7df154' },
        { icon: 'mdi-wifi', url: 'https://ubisam.hanbiro.net/ngw/app/#/' },
        { icon: 'mdi-github', url: 'https://github.com/ubisam-heung' },
    ],
  }),

  mounted() {},

  methods: {},
};
</script>