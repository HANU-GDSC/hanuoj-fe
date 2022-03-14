<template>
    <div class="select" @click="showList = !showList">
        <p>
            {{ selected }}
            <i :class="'fas fa-caret-down ' + (showList ? 'flipped' : '')"></i>
        </p>
        <div class="list" v-show="showList">
            <div
                v-for="(item, index) in selectList"
                :key="index"
                :class="'option ' + (selected === item ? 'selected' : '')"
                :selected="selected === item"
                @click="dataUpdated(item)"
            >
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Select",
    data() {
        return {
            showList: false,
        };
    },
    props: {
        selectList: Array,
        selected: String,
    },
    methods: {
        dataUpdated(item) {
            this.$emit("dataUpdated", item);
        },
    },
};
</script>

<style lang="scss" scoped>
.select {
    p {
        display: block;
        padding: 3px 5px;
        width: 120px;
        border: 1px solid var(--line-color);
        border-top-left-radius: 5px;
        overflow: hidden;
        i {
            float: right;
            margin-top: 2px;
        }
        .flipped {
            transform: rotate(180deg);
        }
    }
    .list {
        position: absolute;
        z-index: 1;
        border: 1px solid var(--line-color);
        border-top: none;
        width: 120px;
        background-color: var(--container-color);
        .option {
            padding: 5px;
        }
        .option:hover {
            text-decoration: underline;
        }
        .selected {
            text-decoration: underline;
        }
    }
}
</style>