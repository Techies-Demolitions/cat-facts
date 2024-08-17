<template>
    <div id="contain">
        <button @click="toggleShowText()" id="showAllButton">{{ showText }}</button>
        <div v-if="!toggle">
            <table>
                <tr>
                    <th>Id</th>
                    <th>Facts</th>
                </tr>
                <tr v-for="items in displayItems " :key="items.id">
                    <td class="idItems">{{ items.id }}</td>
                    <td>{{ items.facts }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useItem } from '@/composable/use-item';
import type { Facts } from '@/types/facts';
import { onMounted, ref } from 'vue';

const { getItem } = useItem()

onMounted(async () => {
    await fetchItems()
})

async function fetchItems() {
    const fetchedItems = await getItem()
    displayItems.value = fetchedItems as Facts[]
}

const displayItems = ref<Facts[]>([])

const showText = ref<string>("Show All")
const toggle = ref<boolean>(true)

function toggleShowText() {
    toggle.value = !toggle.value
    if (toggle.value) {
        showText.value = "Show All"
    } else {
        showText.value = "Hide All"
    }
}
</script>

<style scoped>
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
    min-width: 100px;
    text-align: justify;
    padding: var(--section-gap);
}

th {
    border: 1px solid #8CABFF;
    color: var(--color-heading);
}

.idItems {
    text-align: center;
}
</style>