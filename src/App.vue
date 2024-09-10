<template>
  <div class="center-router-view">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.center-router-view {
  display: flex;
  justify-content: center;
}
</style>
