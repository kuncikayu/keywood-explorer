<script lang="ts" setup>
import { useDashboard } from '@/stores';
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const dashboardStore = useDashboard();
const conf = computed(() => dashboardStore.chains[props.name] || {});

const addFavor = (e: Event) => {
  e.stopPropagation();
  e.preventDefault();
  dashboardStore.favoriteMap[props.name] = !dashboardStore?.favoriteMap?.[props.name];
  window.localStorage.setItem('favoriteMap', JSON.stringify(dashboardStore.favoriteMap));
};
</script>
<template>
  <RouterLink
    :to="`/${name}`"
    class="bg-violet-400/50 hover:bg-violet-400/25 duration-300 transition-all dark:hover:bg-violet-400/25 rounded shadow flex items-center px-3 py-3 cursor-pointer"
  >
    <div class="w-8 h-8 rounded-full overflow-hidden">
      <img :src="conf.logo" />
    </div>
    <div class="ml-4 text-base text-white flex-1 truncate capitalize">
      {{ conf?.prettyName || props.name }}
    </div>
    <div
      @click="addFavor"
      class="pl-4 text-xl"
      :class="{
        'text-warning': dashboardStore?.favoriteMap?.[props.name],
        'text-gray-300 dark:text-gray-500': !dashboardStore?.favoriteMap?.[props.name],
      }"
    >
      <Icon icon="mdi-star" />
    </div>
  </RouterLink>
</template>
