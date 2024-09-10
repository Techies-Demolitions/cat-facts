<template>
  <div class="nes-container is-dark with-title">
    <p id="title" class="title">CATFACTS APP</p>
    <TheWelcome />
  </div>
</template>

<script lang="ts" setup>
import TheWelcome from '@/components/the-welcome.vue';

</script>

<style scoped>
div {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* This centers the child elements horizontally */
}

#title {
  font-size: 2vw;
}
</style>