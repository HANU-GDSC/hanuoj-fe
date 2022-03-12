<template>
    <select @input="dataUpdated">
        <option
            v-for="(item, index) in selectList"
            :key="index"
            :class="selected === item ? 'selected' : ''"
            :selected="selected === item"
        >
            {{ item }}
        </option>
    </select>
</template>

<script>
export default {
    name: "Select",
    props: {
        selectList: Array,
        selected: String,
    },
    methods: {
        dataUpdated(e) {
            this.$emit('dataUpdated', e.target.value);
        },
    },
};
</script>

<style scoped>
</style>