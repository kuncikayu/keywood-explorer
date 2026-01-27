<template>
  <!-- footer -->
  <footer class="flex items-center h-12 mt-5 text-sm bg-gray-100 dark:bg-black py-2 z-10 w-full text-gray-500 dark:text-[#9caeb0]/60">
    <div class="flex flex-1 items-center">
      &copy;&nbsp;
      {{ new Date().getFullYear() }}&nbsp; Made With&nbsp; <img src="../../assets/images/heart.svg" class="w-3" />&nbsp; By&nbsp;
      <a class="text-[#104d37] dark:text-[#3fb68b] hover:opacity-80 transition-all duration-200 no-underline" href="https://ping.pub" target="_blank" rel="noopener noreferrer"
        >Ping.pub</a
      >
    </div>
    <div class="hidden md:!block">
      <a
        class="text-[#104d37] dark:text-[#3fb68b] hover:opacity-80 transition-all duration-200 no-underline mr-4"
        href="https://github.com/ping-pub/explorer/blob/master/LICENSE"
        target="noopener noreferrer"
        >License</a
      >
      <a class="text-[#104d37] dark:text-[#3fb68b] hover:opacity-80 transition-all duration-200 no-underline" href="https://github.com/ping-pub/explorer" target="noopener noreferrer"
        >Github</a
      >
    </div>
  </footer>
</template>
