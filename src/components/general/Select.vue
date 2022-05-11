<template>
    <div class="select" @click="isOpening = !isOpening">
        <p class="select__text">{{ selected === null ? text : selected }}</p>
        <span :class="isOpening ? 'select__icon--flipped' : 'select__icon'">
            <i class="fa-solid fa-circle-arrow-down"></i>
        </span>
        <ul class="select__list" v-if="isOpening">
            <li
                v-for="item in list"
                :key="item.value"
                :class="
                    selected === item.name ? 'select__list__item--selected' : ''
                "
                @click="handleSelect(item)"
            >
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Select",
    data() {
        return {
            isOpening: false,
        };
    },
    props: {
        list: {
            type: Array,
            default: [
                {
                    name: "", // to render
                    value: "", // to return
                },
            ],
        },
        text: {
            type: String,
            default: "choose one",
        },
        selected: {
            type: String,
            default: null,
        }, // name
    },
    methods: {
        handleSelect(item) {
            this.$emit("dataUpdated", item);
        },
        getValue(name) {
            const item = this.list.find(item => item.name === name)
            if (value)
                return item.value;
            else
                return "text";
        }
    },
};
</script>

<style lang="scss" scoped>
.select {
    position: relative;
    width: fit-content;
    min-width: 5rem;
    padding: 5px;
    margin: 5px;
    border: 1px solid var(--stroke-color);
    background: var(--container-color);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &__text {
        margin-right: 5px;
    }
    &__icon {
        transform: rotate(0deg);
        transition: transform 0.4s;
    }
    &__icon--flipped {
        transform: rotate(180deg);
        transition: transform 0.4s;
    }
    &__list {
        position: absolute;
        z-index: 1000;
        top: calc(100% + 5px);
        left: 0;
        padding: 5px;
        min-width: 5rem;
        border: 1px solid var(--stroke-color);
        background: var(--container-color);
        border-radius: 10px;
        &__item--selected {
            font-weight: bold;
        }
    }
}
</style>