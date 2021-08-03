<template>
  <Header :color="themeColor">
    <template #center>設定</template>
  </Header>
  <div class="main">
    <div class="main__default">
      <AutoBorder :index="0" :length="2" :option="autoBorderOption">
        <SettingField @click="$router.push('/setting/themeColor')">
          <template #left>テーマカラー</template>
          <template #right>
            <ColorBox :color="themeColor" :size="1.6"></ColorBox>
          </template>
        </SettingField>
      </AutoBorder>
      <AutoBorder :index="1" :length="2" :option="autoBorderOption">
        <SettingField @click="$router.push('/setting/account')">
          <template #left>アカウント</template>
        </SettingField>
      </AutoBorder>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAutoBorderOption } from '../../components/AutoBorder.vue';
  import AutoBorder from '../../components/AutoBorder.vue';
  import ColorBox from '../../components/ColorBox.vue';
  import Header from '../../components/Header.vue';
  import SettingField from '../../components/SettingField.vue';
  import { usePorts } from '../../usecases';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Setting',
    components: {
      AutoBorder,
      ColorBox,
      Header,
      SettingField,
    },
    setup() {
      const ports = usePorts();

      // header
      const { themeColor } = useThemeColor(ports);

      // contents
      const autoBorderOption = createAutoBorderOption(true, true, true);

      return {
        themeColor,
        autoBorderOption,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    flex: 1 1 auto;
    height: 0;

    overflow: auto;

    &__default {
      margin-top: 3.2rem;
    }
  }
</style>
