<template>
  <Header :color="themeColor">
    <template #center>ログイン</template>
  </Header>
  <div class="main">
    <div v-show="hint" class="main__hint">
      {{ hint }}
    </div>
    <div class="main__form form">
      <div class="form__user-id">
        <input v-model="id" placeholder="ユーザーID" maxlength="20" />
      </div>
      <div class="form__password">
        <input
          v-model="password"
          placeholder="パスワード"
          maxlength="20"
          type="password"
        />
      </div>
      <div class="form__to-signup">
        サインアップは<span @click="$router.push('/auth/create')">こちら</span>
      </div>
      <div class="form__button">
        <Button
          :color="themeColor"
          :darkened-color="themeColor"
          @click="onClick"
          >ログイン</Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from '../../components/Button.vue';
  import Header from '../../components/Header.vue';
  import { initialRunUsecases, usePorts } from '../../usecases';
  import { login } from '../../usecases/login';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Login',
    components: {
      Button,
      Header,
    },
    setup() {
      const ports = usePorts();
      const router = useRouter();

      // header
      const { themeColor } = useThemeColor(ports);

      // form
      const id = ref('');
      const password = ref('');
      const hint = ref('');
      const onClick = async () => {
        if (await login(ports, id.value, password.value)) {
          await initialRunUsecases(ports);
          router.push('/record');
        } else {
          hint.value = 'ユーザーIDまたはパスワードが違います';
        }
      };

      return {
        themeColor,
        id,
        password,
        hint,
        onClick,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    position: relative;

    &__hint {
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center;
      color: $text-red;
    }

    &__form {
      width: 80%;
      max-width: 500px;
      margin: 4.8rem auto 0;
    }
  }

  .form {
    @include flex-column;
    gap: 2rem;

    input {
      // reset
      border: none;
      outline: none;
      padding: 0;

      width: 100%;
      height: 3.6rem;
      padding-left: 1.2rem;
      color: $text-main;
      background: $white;
      font-family: 'Noto Sans JP', sans-serif;
      font-size: $font-medium;

      border: solid 1px $border-gray;
      border-radius: 0.4rem;

      &::placeholder {
        color: $text-sub-light;
      }
    }

    &__to-signup {
      font-size: $font-x-small;
      align-self: center;

      span {
        color: $text-sat;
        @include button-cursor;

        &:hover {
          border-bottom: solid 1px $text-sat;
        }
      }
    }
  }
</style>
