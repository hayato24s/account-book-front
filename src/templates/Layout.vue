<script lang="ts">
  import { defineComponent } from 'vue';
  import Navigation from '../components/Navigation.vue';
  import { initialRunUsecases, usePorts } from '../usecases';
  import { useThemeColor } from '../usecases/useThemeColor';

  export default defineComponent({
    name: 'Layout',
    components: {
      Navigation,
    },
    setup: async () => {
      const ports = usePorts();
      await initialRunUsecases(ports);

      // navigation
      const { themeColor } = useThemeColor(ports);

      return {
        themeColor,
      };
    },
  });
</script>

<template>
  <div class="layout">
    <article class="layout__article">
      <slot />
    </article>
    <Navigation
      v-if="$route.meta.showNavigation ?? true"
      :active-color="themeColor"
    ></Navigation>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .layout {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    &__article {
      flex: 1 1 auto;
      height: 0;

      display: flex;
      flex-direction: column;
    }
  }
</style>
