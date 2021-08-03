<template>
  <Error v-if="errorMessage">
    {{ errorMessage }}
  </Error>
  <Suspense v-else>
    <template #default>
      <Layout>
        <router-view />
      </Layout>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts">
  import { defineComponent, onErrorCaptured, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Error from './components/Error.vue';
  import {
    hex2hsl,
    hex2hsv,
    hex2rgb,
    hsv2rgb,
    rgb2hsv,
  } from './entities/color';
  import Layout from './templates/Layout.vue';
  import {
    NetWorkAccessError,
    NetWorkError,
    Unauthorized,
  } from './usecases/error';

  export default defineComponent({
    name: 'App',
    components: {
      Layout,
      Error,
    },
    setup() {
      const router = useRouter();
      const errorMessage = ref('');

      const hex = '#ff6099';
      const rgb = hex2rgb(hex);
      const hsv = rgb2hsv(rgb);
      console.log('color', hex);
      console.log('rgb', rgb);
      console.log('hsv', hsv);

      onErrorCaptured((error) => {
        if (error instanceof Unauthorized) {
          console.log('unauthorized.');
          router.push('/auth/login');
          return false;
        } else if (error instanceof NetWorkError) {
          errorMessage.value = '通信状況をご確認ください';
          return false;
        } else if (error instanceof NetWorkAccessError) {
          console.error(
            `${error.name}: api falied with status code ${error.status}.\n${error.message}`
          );
          errorMessage.value = 'サーバーエラー';
          return false;
        }
        console.error(error);
      });

      return {
        errorMessage,
      };
    },
  });
</script>

<style lang="scss">
  @import '~/scss/main';
</style>
