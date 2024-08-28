<template>
  <main>
    <div id="container" class="nes-container is-dark">
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
          <button class="nes-btn" @click="toggleShowTextMethod()" id="showAllButton">{{ showText }}</button>
          <ItemTable :isDelete="isDelete" :isEdit="isEdit" :toggleShowText="toggleShowText"
            @showEditModal="showEditModal" @currentCatFactsText="handleCurrentCatFactsText" />
        </div>

        <div id="footer">
          <!-- Generate -->
          <button type="button" @click="handleGenerate()" :class="isGenerateButtonStyle"
            :disabled="isDisabled()">Generate</button>
          <!-- Pop -->
          <button type="button" @click="handlePop()" :class="isPopButtonStyle" :disabled="isDisabled()">Pop</button>
          <!-- Delete -->
          <button type="button" class="nes-btn is-error hvr-grow hvr-buzz-out" @click="handleDelete()"
            v-if="shouldShowDelete">Delete</button>
          <!-- Cancel -->
          <button class="nes-btn" @click="handleCancel()" v-if="!shouldShowDelete">Cancel</button>
          <!-- Change -->
          <button type="button" class="nes-btn is-success hvr-grow" @click="handleUpdate()"
            v-if="shouldShowUpdate">Change
            Fact</button>
          <addModal :showModal="shouldShowAddModal" :generateNewFact="isNewFacts" @itemAdded="handleItemAdded"
            @closeModal="closeModal()" />
          <editModal :showModal="shouldShowEditModal" :passedCatFactsText="itemSelectedFactText"
            :generateNewFact="isNewFacts" @closeModal="closeModal()" @itemUpdated="handleItemUpdated" />
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
import { useLocalStorage, useItem } from '@/composable/use-item';
import type { Facts } from '@/types/facts';
import { computed, onMounted, ref } from 'vue';

const { addItem, getItem, popItem, updateItem } = useItem()

onMounted(() => {
  fetchItemData();
  useLocalStorage();
  generateNewFacts();
})

// declarations
const item = ref<Facts[]>([])
const shouldShowAddModal = ref<boolean>()
const shouldShowEditModal = ref<boolean>()
const itemSelectedFactText = ref<string>();
const isNewFacts = ref<boolean>();
const isDelete = ref<boolean>();
const shouldShowDelete = ref<boolean>(true)
const shouldShowUpdate = ref<boolean>(true)
const isEdit = ref<boolean>(false);
const showText = ref<string>('Hide All')
const toggleShowText = ref<boolean>(false)

// functions
async function fetchItemData() {
  const itemsLoaded = await getItem();
  item.value = itemsLoaded as Facts[];
}

function reloadItems(selector: string): void {
  if (selector === "pop") popItem();
  else if (selector === "add") fetchItemData();
  else if (selector === "update") handleCancel();

  else return;

  useLocalStorage();
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

function handleItemUpdated(previousItemId: number, itemFactUpdate: string, itemDateUpdate: number): void {
  updateItem(previousItemId, itemFactUpdate, itemDateUpdate);
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

function isDeleteOrEditActive(): boolean {
  return isDelete.value || isEdit.value
}

function showEditModal(emitted: boolean) {
  shouldShowEditModal.value = emitted;
}

function handleCurrentCatFactsText(selectedFactText: string): void {
  itemSelectedFactText.value = selectedFactText;
  generateNewFacts();
}

function toggleShowTextMethod(): void {
  showText.value = toggleShowText.value ? "Hide All" : "Show All";
  toggleShowText.value = !toggleShowText.value
}

const isGenerateButtonStyle = computed(() => ({
  "nes-btn is-disabled": isDisabled(),
  "nes-btn is-primary": !isDisabled(),
  "hvr-grow": !isDisabled()
}))

const isPopButtonStyle = computed(() => ({
  "nes-btn is-disabled": isDisabled(),
  "nes-btn is-warning": !isDisabled(),
  "hvr-buzz": !isDisabled()
}))

function isDisabled(): boolean {
  return isDeleteOrEditActive()
}

</script>

<style scoped>
@media (max-width: 800px) {
  #container {
    font-size: 3vw;
  }
}

#container {
  height: 20vw;
  width: auto;
  min-width: var(--section-gap);
  padding: var(--section-gap);
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

#showAllButton {
  margin: 0.5vw;
}

button {
  margin-right: var(--section-gap)
}
</style>