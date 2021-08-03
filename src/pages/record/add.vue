<template>
  <Header :color="themeColor">
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
        @click:right="
          $router.push({ path: '/category', query: { type: selectedType } })
        "
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
    <transition-group name="toast">
      <Toast v-for="toast in toasts" :key="toast.id" :type="toast.type"></Toast>
    </transition-group>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
  import AutoBorder, {
    AutoBorderOption,
    createAutoBorderOption,
  } from '../../components/AutoBorder.vue';
  import Button from '../../components/Button.vue';
  import DatePickers from '../../components/DatePickers.vue';
  import GrayFilter from '../../components/GrayFilter.vue';
  import Header from '../../components/Header.vue';
  import SelectModal, {
    Option as SelectOption,
  } from '../../components/SelectModal.vue';
  import SettingField from '../../components/SettingField.vue';
  import TextFieldAmount from '../../components/TextFieldAmount.vue';
  import TextFieldMemo from '../../components/TextFieldMemo.vue';
  import Toast, { ToastType } from '../../components/Toast.vue';
  import ToggleButton, { Colors } from '../../components/ToggleButton.vue';
  import { darken, desaturate, lighten } from '../../entities/color';
  import {
    jaToRecordType,
    RecordTypeJa,
    recordTypeToJa,
  } from '../../entities/record';
  import { useDayjs, usePorts } from '../../usecases';
  import { getCategories } from '../../usecases/getCategories';
  import { createRecord } from '../../usecases/createRecord';
  import { useSelectedTypeForAdd } from '../../usecases/useSelectedTypeForAdd';
  import { useThemeColor } from '../../usecases/useThemeColor';

  export default defineComponent({
    name: 'Record',
    components: {
      AutoBorder,
      Button,
      DatePickers,
      GrayFilter,
      Header,
      SelectModal,
      SettingField,
      TextFieldAmount,
      TextFieldMemo,
      Toast,
      ToggleButton,
    },
    setup() {
      const ports = usePorts();
      const { selectedType, updateSelectedType } = useSelectedTypeForAdd(ports);
      const categories = computed(() =>
        getCategories(ports, selectedType.value)
      );

      // header
      const { themeColor } = useThemeColor(ports);
      const labels: RecordTypeJa[] = ['支出', '収入'];
      const selectedLabel = ref<RecordTypeJa>(
        recordTypeToJa(selectedType.value)
      );
      watchEffect(() => {
        updateSelectedType(jaToRecordType(selectedLabel.value));
      });
      const labelColors: Colors = {
        color: '#ffffff',
        selectedColor: themeColor.value,
        backgroundColor: lighten(desaturate(themeColor.value, 20), 10),
        sliderColor: '#ffffff',
      };

      // amount
      const amount = ref('');

      // select-modal
      const options = computed<SelectOption[]>(() =>
        categories.value.map((c) => ({ id: c.id, name: c.name }))
      );
      const selectedOption = ref<SelectOption>(
        options.value[0] ?? { id: '', name: '' }
      );
      const selectModal = ref(false);
      const autoBorderOption: AutoBorderOption = createAutoBorderOption(
        true,
        true,
        true
      );
      watch(
        () => selectedType.value,
        () => {
          selectedOption.value = options.value[0] ?? { id: '', name: '' };
        }
      );

      // memo
      const memo = ref('');

      // date
      const date = ref(ports.dayjs().format('YYYY-MM-DD'));

      // button
      const darkenedColor = darken(themeColor.value, 5);
      const save = async () => {
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
        await createRecord(ports, {
          type: selectedType.value,
          amount: Number(amount.value),
          category,
          memo: memo.value,
          date: date.value,
        });
        addToast('success-saving');
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
        selectedType,
        labels,
        selectedLabel,
        labelColors,
        amount,
        selectedOption,
        options,
        memo,
        date,
        darkenedColor,
        save,
        selectModal,
        autoBorderOption,
        toasts,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .main {
    &__form {
      margin: 2.8rem 0 3.6rem;

      .auto-border:first-child {
        margin-bottom: 3.2rem;
      }
    }
  }
</style>
