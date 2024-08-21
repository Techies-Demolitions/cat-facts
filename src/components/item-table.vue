<template>
    <div id="contain">
        <button @click="toggleShowTextMethod()" id="showAllButton">{{ showText }}</button>
        <div v-if="!toggleShowText">
            <table>
                <tr>
                    <th>Id</th>
                    <th>
                        Date<br>
                        (yyyy/mm/dd)
                    </th>
                    <th>Facts</th>
                </tr>
                <tr v-for="facts in displayItems " :key="facts.id" :class="tableRowStyle"
                    @click="handleSelectFact(facts)">
                    <td class="modifiedItems">{{ facts.id }}</td>
                    <td class="modifiedItems">{{ facts.dateCreated }}</td>
                    <td>{{ facts.facts }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeLocalStorage, useItem } from '@/composable/use-item';
import type { Facts } from '@/types/facts';
import { computed, onMounted, ref, watch } from 'vue';

const { getItem, deleteItem, updateItem } = useItem()

onMounted(async () => {
    await fetchItems()
})

const displayItems = ref<Facts[]>([])
const showText = ref<string>("Show All")
const toggleShowText = ref<boolean>(true)
const isDeleteValue = ref<boolean>(false)
const isEditValue = ref<boolean>(false)

const props = defineProps({
    isDelete: Boolean,
    isEdit: Boolean
})

const emit = defineEmits(["showEditModal", "currentCatFactsText"])

watch(
    () => props.isDelete,
    (newValue) => {
        isDeleteValue.value = newValue;
    }
)

watch(
    () => props.isEdit,
    (newValue) => {
        isEditValue.value = newValue
    }
)

async function fetchItems() {
    const fetchedItems = await getItem()
    const sortItems = ref<Facts[]>([])
    sortItems.value = fetchedItems as Facts[]
    displayItems.value = sortItems.value.sort((a, b) => a.id - b.id);
}

function refetchItems(): void {
    fetchItems();
}

function reloadItems(): void {
    refetchItems();
    storeLocalStorage();
}

function toggleShowTextMethod(): void {
    toggleShowText.value = !toggleShowText.value
    showText.value = toggleShowText.value ? "Show All" : "Hide All";
}

function isToolClicked(): boolean {
    return isDeleteValue.value || isEditValue.value
}

function handleIsEditOrDelete(): boolean {
    return isDeleteValue.value
}

const tableRowStyle = computed(() => ({
    'default-row-style': isToolClicked(),
    [handleIsEditOrDelete() ? 'hover-row-style-red' : 'hover-row-style-green']: isToolClicked()
}))

function handleSelectFact(itemSelected: Facts): void {
    if (isDeleteValue.value) handleDelete(itemSelected);
    if (isEditValue.value) handleUpdate(itemSelected.facts);
    reloadItems();
}

function handleDelete(itemSelectedDelete: Facts): void {
    deleteItem(itemSelectedDelete);
}

function handleUpdate(itemSelectedFact: string): void {
    emit("currentCatFactsText", itemSelectedFact)
    toggleShowEditModal()
}

function toggleShowEditModal(): void {
    emit("showEditModal", true)
}

</script>

<style scoped>
.default-row-style {
    background: rgb(104, 92, 92);
}

.hover-row-style-red:hover {
    background-color: red;
    cursor: var(--cursor-pointer)
}

.hover-row-style-green:hover {
    background-color: green;
    cursor: var(--cursor-pointer)
}

#contain {
    border: 1px solid #512B81;
    margin-top: 1vw;
    height: fit-content;
    padding: var(--section-gap);
}

#showAllButton {
    margin: 0.5vw;
}

table {
    border: 1px solid #4477CE;
    width: 100%;
    padding: var(--section-gap);
}

td {
    border-left: 1px solid #8CABFF;
    border-bottom: 1px solid #8CABFF;
    border-right: 1px solid #8CABFF;
    min-width: 150px;
    text-align: justify;
    padding: var(--section-gap);
}

th {
    border: 1px solid #8CABFF;
    color: var(--color-heading);
    text-align: center;
}

.modifiedItems {
    text-align: center;
}
</style>