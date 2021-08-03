<template>
  <Header :color="themeColor">
    <template #center>サインアップ</template>
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
      <div class="form__confirm">
        <input
          v-model="confirm"
          placeholder="パスワードの確認"
          maxlength="20"
          type="password"
        />
      </div>
      <div class="form__to-signin">
        ログインは<span @click="$router.push('/auth/login')">こちら</span>
      </div>
      <div class="form__button">
        <Button
          :color="themeColor"
          :darkened-color="themeColor"
          @click="onClick"
          >サインアップ</Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from '../../components/Button.vue';
  import Header from '../../components/Header.vue';
  import { initialCategoriesInputData } from '../../entities/category';
  import { initialRunUsecases, usePorts } from '../../usecases';
  import { addCategoryPriority } from '../../usecases/addCategoryPriority';
  import { checkUserIdUnique } from '../../usecases/checkUserIdUnique';
  import { createCategory } from '../../usecases/createCategory';
  import { createUser } from '../../usecases/createUser';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Create',
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
      const confirm = ref('');
      const hint = ref('');
      const onClick = async () => {
        if (!id.value) hint.value = 'ユーザーIDを入力してください';
        else if (!password.value) hint.value = 'パスワードを入力してください';
        else if (password.value.length < 8 || 20 < password.value.length)
          hint.value = 'パスワードは8文字以上20以下です';
        else if (password.value !== confirm.value)
          hint.value = 'パスワードが異なります';
        else {
          await createUser(ports, id.value, password.value);
          await initialRunUsecases(ports);
          initialCategoriesInputData.forEach(async (data) => {
            const { id, type } = await createCategory(ports, data);
            addCategoryPriority(ports, type, id);
          });
          router.push('/record');
        }
      };

      watch(
        () => id.value,
        async (newId) => {
          hint.value = (await checkUserIdUnique(ports, newId))
            ? ''
            : 'そのユーザーIDはすでに使われています';
        }
      );

      watch(
        () => password.value,
        (newPassword) => {
          hint.value =
            newPassword && (newPassword.length < 8 || 20 < newPassword.length)
              ? 'パスワードは8文字以上20以下です'
              : '';
        }
      );

      watch(
        () => confirm.value,
        (newConfirm) => {
          hint.value =
            newConfirm !== password.value && newConfirm
              ? 'パスワードが異なります'
              : '';
        }
      );

      return {
        themeColor,
        id,
        password,
        confirm,
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

    &__to-signin {
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
