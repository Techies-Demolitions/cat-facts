<template>
  <main>
    <div id="container">
      <center>
        <div id="header">
          <center>
            <h2>
              Stack Storage System
            </h2>
          </center>
        </div>

        <div id="content">
          <itemCount :countAtCurrent="currentCount()" />
          <ItemTable />
        </div>

        <div id="footer">
          <button @click="showAddModal()" style="margin-right:var(--section-gap)">Generate</button>
          <button @click="handlePop()">Pop</button>
          <addModal :showModal="is_Show" @itemAdded="handleItemAdded" @closeModal="handleFetchSuccess()" />
        </div>
      </center>
    </div>
  </main>
</template>

<script setup lang="ts">
import addModal from '@/components/add-modal.vue';
import itemCount from '@/components/item-count.vue';
import ItemTable from '@/components/item-table.vue';
import { storeLocalStorage, useItem } from '@/composables/use-item';
import type { Item } from '@/types/Item';
import { onMounted, ref } from 'vue';

const { addItem, getItem, popItem } = useItem()

onMounted(() => {
  fetchItemData(),
    storeLocalStorage()
})

async function fetchItemData() {
  const itemsLoaded = await getItem();
  item.value = itemsLoaded as Item[];
}

const item = ref<Item[]>([])

const is_Show = ref<boolean>()
const count = ref<number>();

function currentCount() {
  count.value = item.value.length
  if (count.value < 0) {
    count.value = 0
  }
  return count.value
}

function showAddModal() {
  is_Show.value = true;
}

function handleFetchSuccess() {
  closeModal();
}

function closeModal() {
  is_Show.value = false;
}

function handleItemAdded(itemAdd: string) {
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
  width: 40vw;
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
</style>