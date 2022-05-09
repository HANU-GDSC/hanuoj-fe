<template>
    <div class="pages">
        <div class="page" v-for="index in amount" :key="index" v-show="index === current">
            <slot :name="index"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Pages",
    data() {
        return {};
    },
    props: {
        amount: {
            type: Number,
            default: 1,
        },
        current: {
            type: Number,
            default: 1,
        },
    },
};
</script>

<style lang="scss" scoped>
</style>