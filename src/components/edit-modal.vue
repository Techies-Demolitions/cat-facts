<template>
    <div id="myModal" class="modal" :style="getStyle" ref="modal">
        <!-- Modal content -->
        <div class="modal-content" :class="modalContentStyle">
            <span class="close" :class="nesPointer" @click="closeModal" v-if="shouldShowTools">&times;</span>
            <p style="color: var(--color-text);">
                {{ showFacts() }}
            </p><br>
            <div style="display:inline" v-if="shouldShowTools">
                <button @click="changeKeptFacts()" style="margin-right:var(--section-gap)">Change</button>
                <button @click="generateNewFacts()">Generate New Facts</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// import { getCatFacts } from '@/composable/use-facts'
import { FactsThings } from '@/enums/enums';
import { computed, ref, watch, onMounted } from 'vue';

onMounted(async () => {
    fetchCatData();
    window.addEventListener('click', handleClickOutside);
});

const props = defineProps({
    showModal: Boolean,
    generateNewFact: Boolean,
    passedCatFactsText: String
});

const emit = defineEmits(["closeModal", "itemAdded", "factsForCats", "itemUpdated"]);

// declarations
const isActive = ref<boolean>(false);
const previousFactsId = ref<string>('');
const currentFactsText = ref<string>('');
const currentFactsDate = ref<number>();
const triggerGenerateNewFacts = ref<boolean>();
const shouldShowTools = ref<boolean>(true);
const modal = ref<HTMLElement | null>(null);

// functions
async function fetchCatData() {
    // const fetchedCatFactsData = await getCatFacts();

    // if (typeof (fetchedCatFactsData) === "string") { // responds bad request
    //     currentFactsText.value = FactsThings.ErrorMessage
    //     return
    // }
    // handleIsFactForCats(fetchedCatFactsData.value.facts);
    // insertDate(fetchedCatFactsData.value.created_at);
}

async function refetchCatData() {
    fetchCatData();
}

function insertDate(inputDate: number) {
    currentFactsDate.value = inputDate;
}

function handleIsFactForCats(fetchedFact: string) {
    currentFactsText.value = isFetchedFactForCats(fetchedFact) ? fetchedFact : FactsThings.Generating;
    if (currentFactsText.value === fetchedFact) return
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
        emit("closeModal");
    }
}

function changeKeptFacts() {
    emit("itemUpdated", previousFactsId.value, currentFactsText.value, currentFactsDate.value)
    emit("closeModal");
}

async function generateNewFacts() {
    fetchCatData();
}

function closeModal() {
    emit("closeModal");
}

function showFacts() {
    return currentFactsText.value;
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
        triggerGenerateNewFacts.value = newValue;
        if (triggerGenerateNewFacts.value) {
            generateNewFacts();
        }
    },
    { immediate: true }
);

watch(
    () => currentFactsText.value,
    (itsNewValue) => {
        if (itsNewValue === FactsThings.Generating || itsNewValue === FactsThings.ErrorMessage) {
            shouldShowTools.value = false
        } else {
            shouldShowTools.value = true
        }
    },
    { immediate: true }
);

watch(
    () => props.passedCatFactsText,
    (itsNewValue) => {
        if (itsNewValue === undefined) return
        previousFactsId.value = itsNewValue
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
}

.modal-content-shouldShowTools {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    place-content: center;
    place-items: center;
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
}
</style>