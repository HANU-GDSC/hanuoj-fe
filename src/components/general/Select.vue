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
        }, // value
    },
    methods: {
        handleSelect(item) {
            this.$emit("dataUpdated", item);
        }
    },
};
</script>

<style lang="scss" scoped>
.select {
    position: relative;
    width: fit-content;
    min-width: 5rem;
    height: 2.5rem;
    padding: 0 5px;
    margin: 5px;
    border: 1px solid var(--line-color);
    background: var(--container-color);
    border-radius: 10px;
    display: flex;
    align-items: center;
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
        top: calc(100% + 5px);
        left: 0;
        padding: 5px;
        min-width: 5rem;
        border: 1px solid var(--line-color);
        background: var(--container-color);
        border-radius: 10px;
        li {
            text-align: center;
        }
        &__item--selected {
            font-weight: bold;
        }
    }
}
</style>