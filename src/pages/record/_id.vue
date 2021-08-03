<template>
  <Header :color="themeColor" :left="20.45">
    <template #left>
      <HeaderItem :font-size="1.6" @click="$router.back()"
        >キャンセル</HeaderItem
      >
    </template>
    <template #center>
      <ToggleButton
        v-model:selected="selectedLabel"
        :labels="labels"
        :colors="labelColors"
      ></ToggleButton>
    </template>
  </Header>
  <div class="main">
    <div class="main__form">
      <AutoBorder :length="1" :index="0" :option="autoBorderOption">
        <TextFieldAmount v-model:amount="amount"></TextFieldAmount>
      </AutoBorder>
      <AutoBorder :length="3" :index="0" :option="autoBorderOption">
        <SettingField :show-arrow="false" @click="selectModal = true">
          <template #left>カテゴリー</template>
          <template #right>{{ selectedOption.name }}</template>
        </SettingField>
      </AutoBorder>
      <AutoBorder :length="3" :index="1" :option="autoBorderOption">
        <TextFieldMemo v-model:memo="memo"></TextFieldMemo>
      </AutoBorder>
      <AutoBorder :length="3" :index="2" :option="autoBorderOption">
        <DatePickers v-model:date="date"></DatePickers>
      </AutoBorder>
      <SelectModal
        v-if="selectModal"
        v-model:selectedOption="selectedOption"
        :options="options"
        :color="themeColor"
        @click:left="selectModal = !selectModal"
        @click:right="$router.push('/category')"
      >
        <template #left>閉じる</template>
        <template #header-right>追加/編集</template>
        <template #default="{ option }">
          {{ option.name }}
        </template>
      </SelectModal>
      <GrayFilter
        v-if="selectModal"
        @click="selectModal = !selectModal"
      ></GrayFilter>
    </div>
    <Button :color="themeColor" :darkened-color="darkenedColor" @click="save"
      >保存</Button
    >
    <div class="main__delete">
      <Border color="gray"></Border>
      <CenterField color="red" @click="removeRecord"
        >この収支を削除</CenterField
      >
    </div>
    <transition-group name="toast">
      <Toast v-for="toast in toasts" :key="toast.id" :type="toast.type"></Toast>
    </transition-group>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, Ref, watch, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { RecordType } from '../../api/@types';
  import AutoBorder, {
    AutoBorderOption,
    createAutoBorderOption,
  } from '../../components/AutoBorder.vue';
  import Border from '../../components/Border.vue';
  import Button from '../../components/Button.vue';
  import CenterField from '../../components/CenterField.vue';
  import DatePickers from '../../components/DatePickers.vue';
  import GrayFilter from '../../components/GrayFilter.vue';
  import Header from '../../components/Header.vue';
  import HeaderItem from '../../components/HeaderItem.vue';
  import SelectModal, {
    Option as SelectOption,
  } from '../../components/SelectModal.vue';
  import SettingField from '../../components/SettingField.vue';
  import TextFieldAmount from '../../components/TextFieldAmount.vue';
  import TextFieldMemo from '../../components/TextFieldMemo.vue';
  import ToggleButton, { Colors } from '../../components/ToggleButton.vue';
  import { darken, desaturate, lighten } from '../../entities/color';
  import { useDayjs, usePorts } from '../../usecases';
  import { deleteRecord } from '../../usecases/deleteRecord';
  import { getCategories } from '../../usecases/getCategories';
  import { updateRecord } from '../../usecases/updateRecord';
  import { getRecordById } from '../../usecases/getRecordById';
  import { useThemeColor } from '../../usecases/useThemeColor';
  import Toast, { ToastType } from '../../components/Toast.vue';

  export default defineComponent({
    name: 'Record',
    components: {
      AutoBorder,
      Border,
      Button,
      CenterField,
      DatePickers,
      GrayFilter,
      Header,
      HeaderItem,
      SelectModal,
      SettingField,
      TextFieldAmount,
      TextFieldMemo,
      Toast,
      ToggleButton,
    },
    setup() {
      const ports = usePorts();
      const route = useRoute();
      const router = useRouter();
      const id = route.params.id as string;
      const record = getRecordById(ports, id);
      if (!record) {
        router.back();
        throw new Error("can't find record matched given id.");
      }
      const recordType = ref<RecordType>(record.type);
      const categories = computed(() => getCategories(ports, recordType.value));

      // header
      const { themeColor } = useThemeColor(ports);
      const labels: string[] = ['支出', '収入'];
      const selectedLabel: Ref<string> = ref(
        recordType.value === 'Expense' ? '支出' : '収入'
      );
      watchEffect(() => {
        recordType.value =
          selectedLabel.value === '支出' ? 'Expense' : 'Income';
      });
      const labelColors: Colors = {
        color: '#ffffff',
        selectedColor: themeColor.value,
        backgroundColor: lighten(desaturate(themeColor.value, 20), 10),
        sliderColor: '#ffffff',
      };

      // amount
      const amount = ref(String(record.amount));

      // select-modal
      const options = computed<SelectOption[]>(() =>
        categories.value.map((c) => ({ id: c.id, name: c.name }))
      );
      const selectedOption = ref<SelectOption>(
        options.value.find((o) => o.id === record.category.id) ?? {
          id: '',
          name: '',
        }
      );
      const selectModal = ref(false);
      const autoBorderOption: AutoBorderOption = createAutoBorderOption(
        true,
        true,
        true
      );
      watch(
        () => recordType.value,
        () => {
          selectedOption.value = options.value[0];
        }
      );

      // memo
      const memo = ref(record.memo);

      // date
      const date = ref(record.date);

      // button
      const darkenedColor = darken(themeColor.value, 5);
      const save = () => {
        const category = categories.value.find(
          (c) => c.id === selectedOption.value.id
        );
        if (!amount.value) {
          addToast('warning-amount');
          return;
        }
        if (!category) {
          addToast('warning-category');
          return;
        }
        updateRecord(ports, id, {
          type: recordType.value,
          amount: Number(amount.value),
          category,
          memo: memo.value,
          date: date.value,
        }).then(() => {
          router.push('/record');
        });
      };

      // delete
      const removeRecord = async () => {
        await deleteRecord(ports, id);
        router.back();
      };

      // toast
      const toasts = ref<{ id: string; type: ToastType }[]>([]);
      const addToast = (type: ToastType) => {
        const id = String(useDayjs().valueOf);
        toasts.value.push({ id, type });
        setTimeout(() => {
          if (toasts.value.length === 0) return;
          toasts.value.splice(0, 1);
        }, 1000);
      };

      return {
        themeColor,
        labels,
        selectedLabel,
        labelColors,
        amount,
        selectedOption,
        options,
        selectModal,
        autoBorderOption,
        memo,
        date,
        darkenedColor,
        save,
        removeRecord,
        toasts,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    flex: 1 1 auto;
    position: relative;

    &__form {
      margin: 2.8rem 0 3.6rem;

      .auto-border:first-child {
        margin-bottom: 3.2rem;
      }
    }

    &__delete {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
</style>
