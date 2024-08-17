<template>
  <main>
    <div id="container">
      <center>
        <div id="header">
          <center>
            <h2>
              Cat Facts System
            </h2>
            <img src="/src/assets/cat-paw.png" class="img-class">
          </center>
        </div>

        <div id="content">
          <itemCount :countAtCurrent="currentCount()" />
          <ItemTable />
        </div>

        <div id="footer">
          <button @click="handleGenerate()" style="margin-right:var(--section-gap)">Generate</button>
          <button @click="handlePop()">Pop</button>
          <addModal :showModal="is_Show" :generateNewFact="newFacts" @itemAdded="handleItemAdded"
            @closeModal="handleFetchSuccess()" />
        </div>
      </center>
    </div>
  </main>
</template>

<script setup lang="ts">
import addModal from '@/components/add-modal.vue';
import itemCount from '@/components/item-count.vue';
import ItemTable from '@/components/item-table.vue';
import { storeLocalStorage, useItem } from '@/composable/use-item';
import type { Facts } from '@/types/facts';
import { onMounted, ref } from 'vue';

const { addItem, getItem, popItem } = useItem()

onMounted(() => {
  fetchItemData(),
    storeLocalStorage(),
    generateNewFacts()
})

const item = ref<Facts[]>([])
const is_Show = ref<boolean>()
const count = ref<number>();
const newFacts = ref<boolean>();

async function fetchItemData() {
  const itemsLoaded = await getItem();
  item.value = itemsLoaded as Facts[];
}

function generateNewFacts(): void {
  newFacts.value = true;
}

function currentCount() {
  count.value = item.value.length
  if (count.value < 0) {
    count.value = 0
  }
  return count.value
}

function showAddModal(): void {
  is_Show.value = true;
}

function handleGenerate(): void {
  generateNewFacts();
  showAddModal();
}

function handleFetchSuccess(): void {
  closeModal();
}

function closeModal() {
  is_Show.value = false;
  newFacts.value = false;
}

function handleItemAdded(itemAdd: string): void {
  addItem(itemAdd)
  fetchItemData()
  storeLocalStorage()
}

function handlePop() {
  popItem()
  storeLocalStorage()
}
</script>

<style scoped>
#container {
  height: 20vw;
  width: 55vw;
  padding: var(--section-gap);
  border: 1px solid var(--color-border);
  height: fit-content;
}

#container h2 {
  color: var(--color-heading);
}

#header {
  width: 70%;
}

#content {
  width: 100%;
  margin-top: 1vw;
  height: fit-content;
  padding: var(--section-gap);
}

.img-class {
  width: 5vw;
  height: 5vw;
  margin-top: var(--section-gap);
}
</style>