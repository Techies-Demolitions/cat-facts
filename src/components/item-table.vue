<template>
    <div id="contain" class="nes-container is-dark">
        <div class="nes-table-responsive" v-if="!shouldShowText">
            <table class="nes-table is-bordered is-dark" v-if="isFactsArrayNotEmpty()">
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
                        <td class="modifiedItems">{{ facts.created_at }}</td>
                        <td>{{ facts.facts }}</td>
                    </tr>
                </tbody>
            </table>
            <div v-else style="color:var(--color-text)">
                Nothing Here
            </div>
        </div>
        <div v-else style="color:var(--color-text)">
            Nothing Here
        </div>
    </div>
</template>

<script setup lang="ts">
import { useFacts } from '@/composable/use-facts';
import { useFactsStore } from '@/composable/use-item-store';
import type { ClientSideFact } from '@/types/facts';
import { computed, onMounted, ref, watch } from 'vue';

const { getFacts, deleteFacts } = useFacts()
const { getCatFactsStore } = useFactsStore()

onMounted(async () => {
    await fetchCatFacts()
})

const props = defineProps({
    isDelete: Boolean,
    isEdit: Boolean,
    toggleShowText: Boolean
})

const emit = defineEmits(["showEditModal", "currentCatFactsText"])

// declarations
const displayItems = ref<ClientSideFact[]>([])
const shouldShowText = ref<boolean>(false)
const isDeleteValue = ref<boolean>(false)
const isEditValue = ref<boolean>(false)

// functions
async function fetchCatFacts(): Promise<void> {
    const fetchedItems = await getFacts()
    const sortItems = fetchedItems as ClientSideFact[]
    displayItems.value = sortItems.sort((a, b) => a.id - b.id);
    console.log(fetchedItems[0].facts)
}

function refetchCatFacts(): void {
    fetchCatFacts();
}

function reloadItems(): void {
    refetchCatFacts();
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

function handleSelectFact(itemSelected: ClientSideFact): void {
    if (isDeleteValue.value) handleDelete(itemSelected);
    if (isEditValue.value) handleUpdate(itemSelected.id);
    reloadItems();
}

function handleDelete(itemSelectedDelete: ClientSideFact): void {
    // deleteItem(itemSelectedDelete);
}

function handleUpdate(itemSelectedId: number): void {
    emit("currentCatFactsText", itemSelectedId)
    toggleShowEditModal()
}

function toggleShowEditModal(): void {
    emit("showEditModal", true)
}

function isFactsArrayNotEmpty(): boolean {
    const result = displayItems.value.length;

    return result !== 0
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