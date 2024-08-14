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
          <button @click="showAddModal()">Push</button>
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
  width: 30vw;
  padding: 1vw;
  border: 1px solid white;
  height: fit-content;
}

#header {
  border-bottom: 1px solid white;
  width: 70%;
}

#content {
  width: 100%;
  border: 1px solid white;
  margin-top: 1vw;
  height: fit-content;
  padding: 1vw;
}
</style>