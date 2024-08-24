<template>
    <div id="contain" class="nes-container is-dark">
        <div class="nes-table-responsive" v-if="!shouldShowText">
            <table class="nes-table is-bordered is-dark">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>
                            Date<br>
                            (yyyy/mm/dd)
                        </th>
                        <th>Facts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="facts in displayItems " :key="facts.id" :class="tableRowStyle"
                        @click="handleSelectFact(facts)">
                        <td class="modifiedItems">{{ facts.id }}</td>
                        <td class="modifiedItems">{{ facts.dateCreated }}</td>
                        <td>{{ facts.facts }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeLocalStorage, useItem } from '@/composable/use-item';
import type { Facts } from '@/types/facts';
import { computed, onMounted, ref, watch } from 'vue';

const { getItem, deleteItem } = useItem()

onMounted(async () => {
    await fetchItems()
})

const props = defineProps({
    isDelete: Boolean,
    isEdit: Boolean,
    toggleShowText: Boolean
})

const emit = defineEmits(["showEditModal", "currentCatFactsText"])

// declarations
const displayItems = ref<Facts[]>([])
const shouldShowText = ref<boolean>(false)
const isDeleteValue = ref<boolean>(false)
const isEditValue = ref<boolean>(false)

// functions
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

function isToolClicked(): boolean {
    return isDeleteValue.value || isEditValue.value
}

function handleIsEditOrDelete(): boolean {
    return isDeleteValue.value
}

const tableRowStyle = computed(() => ({
    'default-row-style': isToolClicked(),
    [handleIsEditOrDelete() ? 'hover-row-style-red' : 'hover-row-style-green']: isToolClicked(),
    "nes-pointer": isToolClicked()
}))

function handleSelectFact(itemSelected: Facts): void {
    if (isDeleteValue.value) handleDelete(itemSelected);
    if (isEditValue.value) handleUpdate(itemSelected.id);
    reloadItems();
}

function handleDelete(itemSelectedDelete: Facts): void {
    deleteItem(itemSelectedDelete);
}

function handleUpdate(itemSelectedId: number): void {
    emit("currentCatFactsText", itemSelectedId)
    toggleShowEditModal()
}

function toggleShowEditModal(): void {
    emit("showEditModal", true)
}

// watchers
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

watch(
    () => props.toggleShowText,
    (newValue) => {
        shouldShowText.value = newValue
    }
)


</script>

<style scoped>
.default-row-style {
    background: rgb(104, 92, 92);
}

.hover-row-style-red:hover {
    background-color: #E03838;
}

.hover-row-style-green:hover {
    background-color: #00A800;
}

#contain {
    height: fit-content;
    width: 100%;
    padding: var(--section-gap);
}

@media (max-width: 800px) {
    #contain {
        height: 350px;
        overflow: auto;
    }
}


td {
    min-width: 150px;
    text-align: justify;
    padding: var(--section-gap);
}

th {
    text-align: center;
}

.modifiedItems {
    text-align: center;
}
</style>