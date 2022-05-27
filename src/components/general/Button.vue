<template>
    <button
        :title="des"
        class="relative rounded-lg text-base p-2.5"
        :class="disabled ? 'disabled' : type"
        :disabled="disabled"
        @click="click()"
    >

        <span :class="loading ? 'opacity-0' : ''">
            {{ text }}
        </span>

        <LoadingIcon
            v-if="loading"
            class="
                absolute
                top-1/2
                left-1/2
                transform
                -translate-x-1/2 -translate-y-1/2
            "
        />

    </button>
</template>

<script>
import LoadingIcon from "../general/LoadingIcon.vue";

export default {
    name: "Button",
    props: {
        text: String,
        type: {
            type: String,
            default: "primary",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        des: {
            type: String,
            default: "",
        },
    },
    components: {
        LoadingIcon,
    },
    methods: {
        click() {
            if (!this.disabled && !this.loading) {
                this.$emit("clicked");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.disabled {
    @apply bg-indigo-100 text-indigo-300 cursor-not-allowed;
}
.primary {
    @apply bg-indigo-700 text-white hover:bg-indigo-800 active:bg-indigo-900 focus:ring-2 focus:ring-indigo-900
    dark:bg-white dark:text-indigo-900 dark:hover:bg-indigo-100 dark:active:bg-indigo-200 dark:focus:ring-indigo-300;
}
</style>
