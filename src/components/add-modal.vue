<template>
    <div id="myModal" class="modal" :style="getStyle" ref="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <p style="color: var(--color-text);">
                {{ showFacts() }}
            </p><br>
            <div style="display:inline">
                <button @click="handleKeep()" style="margin-right:var(--section-gap)">Keep</button>
                <button @click="handleGenerateNewFacts()">Generate New Facts</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Item } from '@/types/Item';
import { computed, ref, watch, onMounted } from 'vue';

onMounted(async () => {
    window.addEventListener('click', handleClickOutside),
        await fetchCatData()
            .then(() => {
                console.log("Process Finished")
            })
            .catch((error) => {
                console.log("Error Found: " + error)
            })
});

const catUrl = 'https://cat-fact.herokuapp.com/facts/591f98803b90f7150a19c229'
const cats = ref()

async function fetchCatData() {
    console.log("Fetching Data...")
    const response = await fetch(catUrl)
    console.log("Fetched data")
    const data = await response.json()
    cats.value = data.updatedAt
    console.log("Cats Info: " + JSON.stringify(cats.value))
}

const item = ref<Item>({
    id: 0,
    name: ""
})

const props = defineProps({
    showModal: Boolean
});

const emit = defineEmits(["closeModal", "itemAdded"]);

const isActive = ref<boolean>(false);

const modal = ref<HTMLElement | null>(null);

watch(
    () => props.showModal,
    (newValue) => {
        isActive.value = newValue;
    },
    { immediate: true }
);

const getStyle = computed(() => ({
    display: isActive.value ? 'block' : 'none'
}));

function handleClickOutside(event: MouseEvent) {
    if (modal.value && event.target === modal.value) {
        emit("closeModal");
    }
}

function handleKeep() {
    // checks if input is empty
    emit("itemAdded", item.value.name)
    emit("closeModal")
}

async function handleGenerateNewFacts() {

}

function closeModal() {
    emit("closeModal")
}

function showFacts() {
    return "Yehey"
}
</script>

<style scoped>
/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    place-content: center;
    place-items: center;
}

/* Modal Content */
.modal-content {
    background-color: var(--color-background-soft);
    padding: var(--section-gap);
    border: 1px solid var(--color-border);
    width: 25%;
    height: fit-content;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* The Close Button */
.close {
    color: red;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>