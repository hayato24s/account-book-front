<script lang="ts">
  /**
   * reference to
   * https://q-az.net/elements-drag-and-drop/
   */

  import { computed, defineComponent, onMounted, PropType, ref } from 'vue';

  export type Data = {
    id: string;
    name: string;
  };

  const adjustEvent = (e: MouseEvent | TouchEvent): MouseEvent | Touch => {
    return e.type.slice(0, 5) === 'mouse'
      ? (e as MouseEvent)
      : (e as TouchEvent).changedTouches[0];
  };

  export default defineComponent({
    name: 'DragAndDrop',
    props: {
      data: {
        type: Array as PropType<Data[]>,
        required: true,
      },
      draggableElement: {
        type: String,
        default: 'drag-and-drop__item',
      },
    },
    emits: ['update:data'],
    setup(props, { emit }) {
      const items = computed(() => [...props.data]);
      const height = ref(0);

      // media query
      const mediaQuery = window.matchMedia('(min-width: 429px)');
      const handleResize = (e: any) => {
        height.value = e.matches ? 43 : 36;
      };
      mediaQuery.addListener(handleResize);
      handleResize(mediaQuery);

      const elements: Array<HTMLElement> = []; // drag-and-drop__item
      let target: HTMLElement | null;
      let y: number | null; // 動かしている要素のoffsetTopとタッチしている位置のy座標との差
      let index = -1;

      const validateIndex = (indices: number[]) => {
        return indices.every((i) => -1 < i && i < elements.length);
      };

      const validateEvent = (path: HTMLElement[]) => {
        return path.some((e) => e.classList?.contains(props.draggableElement));
      };

      const mouseDown = (e: MouseEvent | TouchEvent) => {
        const path = (e as (MouseEvent | TouchEvent) & { path: HTMLElement[] })
          .path;
        const event = adjustEvent(e);
        if (!validateEvent(path)) return;
        target =
          path.find((el) => el.className === 'drag-and-drop__item') ?? null;
        if (!target) return;
        // フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();
        target.classList.add('--active');
        target.style.zIndex = '10';
        y = event.pageY - target.offsetTop;
        index = elements.findIndex((el) => el.classList.contains('--active'));
        target.addEventListener('mousemove', mouseMove, false);
        target.addEventListener('mouseup', mouseUp, false);
        target.addEventListener('mouseleave', mouseUp, false);
        target.addEventListener('touchmove', mouseMove, false);
        target.addEventListener('touchend', mouseUp, false);
        target.addEventListener('touchleave', mouseUp, false);
      };

      const mouseMove = (e: MouseEvent | TouchEvent) => {
        if (!target || !y) return;
        const event = adjustEvent(e);
        const offsetTop = event.pageY - y;
        target.style.top = `${offsetTop}px`;
        if (
          height.value * (index + 1) < target.offsetTop &&
          validateIndex([index, index + 1])
        ) {
          elements[index + 1].style.top = `${height.value * index}px`;
          elements.splice(index, 2, elements[index + 1], elements[index]);
          items.value.splice(
            index,
            2,
            items.value[index + 1],
            items.value[index]
          );
          index += 1;
        } else if (
          target.offsetTop < height.value * (index - 1) &&
          validateIndex([index - 1, index])
        ) {
          elements[index - 1].style.top = `${height.value * index}px`;
          elements.splice(index - 1, 2, elements[index], elements[index - 1]);
          items.value.splice(
            index - 1,
            2,
            items.value[index],
            items.value[index - 1]
          );
          index -= 1;
        }
      };

      const mouseUp = () => {
        if (!target) return;
        target.style.top = `${height.value * index}px`;
        target.removeEventListener('mousemove', mouseMove, false);
        target.removeEventListener('mouseup', mouseUp, false);
        target.removeEventListener('mouseleave', mouseUp, false);
        target.removeEventListener('touchmove', mouseMove, false);
        target.removeEventListener('touchend', mouseUp, false);
        target.removeEventListener('touchleave', mouseUp, false);
        target.classList.remove('--active');
        target.style.zIndex = '0';
        target = null;
        y = null;
        index = -1;
        emit('update:data', items.value);
      };

      onMounted(() => {
        const collection = document.getElementsByClassName(
          'drag-and-drop__item'
        );
        for (var i = 0; i < collection.length; i++) {
          const el = collection[i] as HTMLElement;
          elements.push(el);
          el.addEventListener('mousedown', mouseDown, false);
          el.addEventListener('touchstart', mouseDown, false);
        }
      });

      return {
        items,
        height,
      };
    },
  });
</script>

<template>
  <div class="drag-and-drop" :style="{ height: `${height * data.length}px` }">
    <template v-for="(item, i) in items" :key="item.id">
      <div class="drag-and-drop__item" :style="{ top: `${height * i}px` }">
        <slot :item="item" :index="i"></slot>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  @import '~/scss/main.scss';

  .drag-and-drop {
    position: relative;

    &__item {
      width: 100%;
      position: absolute;
      left: 0;
      transition: top 0.25s ease-in-out;

      &.--active {
        opacity: 0.8;
        box-shadow: 0 0 0.5rem black;
        transition: none;
      }
    }
  }
</style>
