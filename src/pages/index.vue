<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useDashboard, LoadingStatus } from '@/stores';
import type { ChainConfig } from '@/types/chaindata';
import ChainSummary from '@/components/ChainSummary.vue';
import AdBanner from '@/components/ad/AdBanner.vue';

import { computed, onMounted, ref } from 'vue';
import { useBlockchain } from '@/stores';

const dashboard = useDashboard();

const keywords = ref('');
const activeTab = ref('cosmos');

const chains = computed(() => {
  if (keywords.value) {
    const lowercaseKeywords = keywords.value.toLowerCase();

    return Object.values(dashboard.chains).filter(
      (x: ChainConfig) =>
        x.chainName.toLowerCase().indexOf(lowercaseKeywords) > -1 ||
        x.prettyName.toLowerCase().indexOf(lowercaseKeywords) > -1
    );
  } else {
    return Object.values(dashboard.chains);
  }
});

const featured = computed(() => {
  const names = ['cosmos', 'osmosis', 'akash', 'celestia', 'evmos', 'injective', 'dydx', 'noble'];
  return chains.value
    .filter((x) => names.includes(x.chainName))
    .sort((a, b) => names.indexOf(a.chainName) - names.indexOf(b.chainName));
});

const cosmosEcosystem = computed(() => {
  const featuredNames = ['cosmos', 'osmosis', 'akash', 'celestia', 'evmos', 'injective', 'dydx', 'noble'];
  return Object.values(dashboard.chains).filter((x: ChainConfig) => !featuredNames.includes(x.chainName));
});

const chainStore = useBlockchain();
</script>

<template>
  <div class="">
    <div
      class="flex md:!flex-row flex-col items-center justify-center mb-6 mt-14 gap-2"
    >
      <div class="w-16 rounded-full">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <h1 class="text-[#104d37] dark:text-[#3fb68b] text-3xl md:!text-6xl font-bold">
        {{ $t('pages.title') }}
      </h1>
    </div>
    
    <div v-if="dashboard.status !== LoadingStatus.Loaded" class="flex justify-center">
      <progress class="progress progress-info w-80 h-1"></progress>
    </div>

    <div class="flex justify-center my-6">
      <div class="tabs tabs-boxed bg-base-200 dark:bg-black rounded-xl">
        <a
          class="tab text-base font-semibold transition-colors duration-200"
          :class="{ 'tab-active text-white !bg-[#104d37] dark:!bg-[#3fb68b]': activeTab === 'cosmos' }"
          @click="activeTab = 'cosmos'"
        >
          Cosmos Ecosystem 🚀
        </a>
        <a
          class="tab text-base font-semibold transition-colors duration-200"
          :class="{ 'tab-active text-white !bg-[#104d37] dark:!bg-[#3fb68b]': activeTab === 'featured' }"
          @click="activeTab = 'featured'"
        >
          Featured 🔥
        </a>
      </div>
    </div>

    <template v-if="activeTab === 'featured'">
      <div class="text-center text-base mt-6 text-[#104d37] dark:text-[#3fb68b]">
        <h2 class="mb-6 text-xl">Featured Blockchains 🔥</h2>
      </div>
      <div
        v-if="featured.length > 0"
        class="grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5"
      >
        <ChainSummary v-for="(chain, index) in featured" :key="index" :name="chain.chainName" />
      </div>
    </template>

    <template v-if="activeTab === 'cosmos'">
      <div class="text-center text-base mt-6 text-[#104d37] dark:text-[#3fb68b]">
        <h2 class="mb-6 text-xl">{{ $t('pages.description') }}</h2>
      </div>

      <div class="flex items-center rounded-lg bg-base-200 dark:bg-black border border-[#104d37]/40 dark:border-[#3fb68b]/30 mt-10">
        <Icon icon="mdi:magnify" class="text-2xl text-gray-400 ml-3" />
        <input
          :placeholder="$t('pages.search_placeholder')"
          class="px-4 h-10 bg-transparent flex-1 outline-none text-base"
          v-model="keywords"
        />
        <div class="px-4 text-base hidden md:!block">{{ chains.length }}/{{ dashboard.length }}</div>
      </div>

      <div class="grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5">
        <ChainSummary v-for="(chain, index) in chains" :key="index" :name="chain.chainName" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.logo path {
  fill: #0b0f19;
}
</style>