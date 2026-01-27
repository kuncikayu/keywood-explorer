<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, computed, watch } from 'vue';
import { useBaseStore } from '@/stores';

const baseStore = useBaseStore();
const theme = computed(() => baseStore.theme);

const changeMode = () => {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
};

const applyTheme = (val: 'dark' | 'light') => {
  if (val === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
  document.documentElement.setAttribute('data-theme', val);
  window.localStorage.setItem('theme', val);
  baseStore.theme = val;
};

// Initial theme application
onMounted(() => {
  applyTheme(theme.value);
});

// Watch for theme changes from other sources if any
watch(theme, (newVal) => {
  if (newVal !== (document.documentElement.getAttribute('data-theme') as any)) {
    applyTheme(newVal);
  }
});
</script>

<template>
  <div class="flex items-center px-2">
    <label class="theme-switch relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only peer" :checked="theme === 'dark'" @change="changeMode" />
      <div
        class="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#1e3a33] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#104d37]"
      ></div>
      <div class="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none transition-opacity" :class="theme === 'dark' ? 'opacity-0' : 'opacity-100'">
        <Icon icon="mdi-weather-sunny" class="text-xs text-orange-400" />
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none transition-opacity" :class="theme === 'dark' ? 'opacity-100' : 'opacity-0'">
        <Icon icon="mdi-weather-night" class="text-xs text-gray-300" />
      </div>
    </label>
  </div>
</template>

<style scoped>
.theme-switch {
  user-select: none;
}
</style>
