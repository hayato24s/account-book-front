<template>
  <Header :color="themeColor">
    <template #left>
      <HeaderItem :font-size="1.6" :size="2" @click="$router.back()"
        >戻る</HeaderItem
      >
    </template>
    <template #center>アカウント</template>
  </Header>
  <div class="main">
    <div class="main__info">
      <AutoBorder :index="0" :length="1" :option="autoBorderOption">
        <SettingField :show-arrow="false">
          <template #left>ユーザーID</template>
          <template #right>{{ user.id }}</template>
        </SettingField>
      </AutoBorder>
    </div>
    <div class="main__logout">
      <Border />
      <CenterField @click="handleLogout">ログアウト</CenterField>
      <Border />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import AutoBorder, {
    createAutoBorderOption,
  } from '../../../components/AutoBorder.vue';
  import Border from '../../../components/Border.vue';
  import CenterField from '../../../components/CenterField.vue';
  import Header from '../../../components/Header.vue';
  import HeaderItem from '../../../components/HeaderItem.vue';
  import SettingField from '../../../components/SettingField.vue';
  import { usePorts } from '../../../usecases';
  import { getUser } from '../../../usecases/getUser';
  import { logout } from '../../../usecases/logout';
  import { useThemeColor } from '../../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Account',
    components: {
      AutoBorder,
      Border,
      CenterField,
      Header,
      HeaderItem,
      SettingField,
    },
    setup() {
      const ports = usePorts();
      const router = useRouter();

      // header
      const { themeColor } = useThemeColor(ports);

      // user
      const user = computed(() => getUser(ports));
      if (!user.value) router.push('/auth/login');
      const autoBorderOption = createAutoBorderOption(true, true, true);

      // logout
      const handleLogout = async () => {
        logout(ports);
        router.push('/auth/login');
      };

      return {
        themeColor,
        user,
        autoBorderOption,
        handleLogout,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    flex: 1 1 auto;

    position: relative;

    &__info {
      margin: 3.2rem 0;

      .setting-field {
        cursor: default;
        &:active {
          background: $white;
        }
      }
    }

    &__logout {
      position: absolute;
      width: 100%;
      bottom: 3.2rem;
    }
  }
</style>
