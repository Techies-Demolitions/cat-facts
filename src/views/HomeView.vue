<template>
  <main>
    <div id="container">
      <center>
        <div id="header">
          <center>
            <h2>
              <span class="nes-text is-primary">Cat Facts Generator</span>
            </h2>
            <img src="/src/assets/cat-paw.png" class="img-class">
          </center>
        </div>

        <div id="content">
          <itemCount :itemCountAtCurrent="currentItemCount()" />
          <ItemTable :isDelete="isDelete" :isEdit="isEdit" @showEditModal="handleShowEditModal"
            @currentCatFactsText="handleCurrentCatFactsText" />
        </div>

        <div id="footer">
          <button @click="handleGenerate()">Generate</button>
          <button @click="handlePop()">Pop</button>
          <button @click="handleDelete()" v-if="shouldShowDelete">Delete</button>
          <button @click="handleCancel()" v-if="!shouldShowDelete">Cancel</button>
          <button @click="handleUpdate()" v-if="shouldShowUpdate">Change Fact</button>
          <addModal :showModal="shouldShowAddModal" :generateNewFact="isNewFacts" @itemAdded="handleItemAdded"
            @closeModal="closeModal()" />
          <editModal :showModal="shouldShowEditModal" :passedCatFactsText="itemSelectedFactText"
            @closeModal="closeModal()" @itemUpdated="handleItemUpdated" />
        </div>
      </center>
    </div>
  </main>
</template>

<script setup lang="ts">
import addModal from '@/components/add-modal.vue';
import editModal from '@/components/edit-modal.vue';
import itemCount from '@/components/item-count.vue';
import ItemTable from '@/components/item-table.vue';
import { storeLocalStorage, useItem } from '@/composable/use-item';
import type { Facts } from '@/types/facts';
import { onMounted, ref } from 'vue';

const { addItem, getItem, popItem, updateItem } = useItem()

onMounted(() => {
  fetchItemData();
  storeLocalStorage();
  generateNewFacts();
})

const item = ref<Facts[]>([])
const shouldShowAddModal = ref<boolean>()
const shouldShowEditModal = ref<boolean>()
const itemSelectedFactText = ref<string>();
const isNewFacts = ref<boolean>();
const isDelete = ref<boolean>();
const shouldShowDelete = ref<boolean>(true)
const shouldShowUpdate = ref<boolean>(true)
const isEdit = ref<boolean>(false);

async function fetchItemData() {
  const itemsLoaded = await getItem();
  item.value = itemsLoaded as Facts[];
}

function reloadItems(selector: string): void {
  if (selector === "pop") popItem();
  else if (selector === "add") fetchItemData();
  else if (selector === "update") handleCancel();
  else return;

  storeLocalStorage();
}

function generateNewFacts(): void {
  isNewFacts.value = true;
}

function currentItemCount(): number {
  const itemCount = ref<number>();
  itemCount.value = item.value.length
  if (itemCount.value < 0) {
    itemCount.value = 0
  }
  return itemCount.value
}

function showAddModal(): void {
  shouldShowAddModal.value = true;
}

function handleGenerate(): void {
  generateNewFacts();
  showAddModal();
}

function closeModal() {
  shouldShowAddModal.value = false;
  shouldShowEditModal.value = false;
  isNewFacts.value = false;
}

function handleItemAdded(itemFact: string, itemDate: number): void {
  addItem(itemFact, itemDate)
  reloadItems("add");
}

function handleItemUpdated(previousItemFact: string, itemFactUpdate: string, itemDateUpdate: number): void {
  updateItem(previousItemFact, itemFactUpdate, itemDateUpdate);
  reloadItems("update");
}

function handlePop() {
  reloadItems("pop")
}

function handleDelete() {
  isDelete.value = true;
  shouldShowDelete.value = false;
  shouldShowUpdate.value = false;
}

function handleCancel() {
  isDelete.value = false;
  isEdit.value = false;
  shouldShowDelete.value = true;
  shouldShowUpdate.value = true;
}

function handleUpdate() {
  isEdit.value = true;
  shouldShowUpdate.value = false;
  shouldShowDelete.value = false;
}

function handleShowEditModal(emitted: boolean) {
  shouldShowEditModal.value = emitted;
}

function handleCurrentCatFactsText(selectedFactText: string): void {
  itemSelectedFactText.value = selectedFactText;
}

</script>

<style scoped>
#container {
  height: 20vw;
  width: auto;
  min-width: var(--section-gap);
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

button {
  margin-right: var(--section-gap)
}
</style>