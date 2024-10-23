<template>
    <div id="myModal" class="modal" :style="getStyle" ref="modal">
        <!-- Modal content -->
        <div class="modal-content" :class="modalContentStyle">
            <span id="close" :class="nesPointer" @click="closeModal" v-if="shouldShowTools">&times;</span>
            <p id="showFacts">
                {{ showFacts() }}
            </p><br>
            <div style="display:inline" v-if="shouldShowTools">
                <button @click="keepFacts()" style="margin-right:var(--section-gap)">Keep</button>
                <button @click="generateNewFacts()">Generate New Facts</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FactsThings } from '@/enums/enums';
import { computed, ref, watch, onMounted } from 'vue';

onMounted(async () => {
    window.addEventListener('click', handleClickOutside);
});

const props = defineProps({
    showModal: Boolean,
    generateNewFact: Boolean
});

const emit = defineEmits(["closeModal", "itemAdded", "factsForCats"]);

// declarations
const isActive = ref<boolean>(false);
const catFactsText = ref<string>('');
const catFactsDate = ref<number>();
const generateNewFactsIsTrigger = ref<boolean>();
const shouldShowTools = ref<boolean>(true);
const modal = ref<HTMLElement | null>(null);

// functions
async function fetchCatData() {
    // const fetchedCatFactsData = await getCatFacts();

    // if (typeof (fetchedCatFactsData) !== "object") { // responds bad request
    //     catFactsText.value = FactsThings.ErrorMessage;
    //     return
    // }

    // handleIsFactForCats(fetchedCatFactsData.value.facts);
    // insertDate(fetchedCatFactsData.value.created_at);
}

async function refetchCatData() {
    fetchCatData();
}

function insertDate(fetchedDateCreated: number) {
    catFactsDate.value = fetchedDateCreated;
}

function handleIsFactForCats(fetchedFact: string) {
    catFactsText.value = isFetchedFactForCats(fetchedFact) ? fetchedFact : FactsThings.Generating;
    if (catFactsText.value === fetchedFact) return
    refetchCatData();
}

function isFetchedFactForCats(input: string): boolean {
    if (input.search(/cat/i) > 0) { return true; }
    else { return false; }
}

const getStyle = computed(() => ({
    display: isActive.value ? 'block' : 'none'
}));

const modalContentStyle = computed(() => ({
    'modal-content-shouldShowTools': !shouldShowTools.value
}));

const nesPointer = computed(() => ({
    'nes-pointer': true
}))

function handleClickOutside(event: MouseEvent) {
    if (modal.value && event.target === modal.value) {
        closeModal();
    }
}

function keepFacts() {
    emit("itemAdded", catFactsText.value, catFactsDate.value);
    closeModal();
}

async function generateNewFacts() {
    fetchCatData();
}

function closeModal() {
    emit("closeModal");
}

function showFacts() {
    return catFactsText.value;
}

// watchers
watch(
    () => props.showModal,
    (newValue) => {
        isActive.value = newValue;
    },
    { immediate: true }
);

watch(
    () => props.generateNewFact,
    (newValue) => {
        generateNewFactsIsTrigger.value = newValue;
        if (generateNewFactsIsTrigger.value) {
            generateNewFacts();
        }
    },
    { immediate: true }
);

watch(
    () => catFactsText.value,
    (itsNewValue) => {
        if (itsNewValue === FactsThings.Generating || itsNewValue === FactsThings.ErrorMessage) {
            shouldShowTools.value = false
        }
        else {
            shouldShowTools.value = true
        }
    },
    { immediate: true }
);

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
    color: var(--color-text);
}

.modal-content-shouldShowTools {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    place-content: center;
    place-items: center;
}

@media (max-width: 800px) {
    .modal-content {
        width: auto;
        margin: 5vw;
    }
}

/* The Close Button */
#close {
    color: red;
    float: right;
    font-size: 28px;
    padding: 1px;
}

#close:hover,
#close:focus {
    color: #000;
    text-decoration: none;
}

#showFacts {
    color: var(--color-text);
    display: flex;
    place-content: center;
    place-items: center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
}
</style>