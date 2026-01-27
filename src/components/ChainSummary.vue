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
    class="bg-[#104d37]/10 hover:bg-[#104d37]/20 duration-300 transition-all dark:bg-[#061a15] dark:hover:bg-[#104d37]/20 dark:border-[#3fb68b]/20 border border-transparent rounded shadow flex items-center px-3 py-3 cursor-pointer"
  >
    <div class="w-8 h-8 rounded-full overflow-hidden">
      <img :src="conf.logo" />
    </div>
    <div class="ml-4 text-base text-main dark:text-white flex-1 truncate capitalize">
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
