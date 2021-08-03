<template>
  <div class="not-found">not found</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'NotFound',
    setup() {
      const router = useRouter();
      router.push('/record');
    },
  });
</script>
