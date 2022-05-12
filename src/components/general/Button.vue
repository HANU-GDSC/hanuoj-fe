<template>
    <button
        :type="type"
        :title="des"
        :class="type"
        :disabled="disable"
        @click="click()"
    >
        {{ text }}
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",

    props: {
        text: String,
        type: {
            type: String,
            default: "default",
        },
        disable: {
            type: Boolean,
            default: false,
        },
        des: {
            type: String,
        },
    },

    methods: {
        click() {
            if (!this.disable) {
                this.$emit("click");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    min-width: 5rem;
    border-radius: 10px;
    padding: 8px;
    margin: 5px;
    overflow: hidden;
}

// default
.default {
    color: var(--first-color);
    background-color: var(--container-color);
    border: 1px solid var(--stroke-color);
}
.default:hover {

}

// darker
.darker {
    color: var(--container-color);
    background-color: var(--first-color-alt);;
}

/* disable */

.btnDisable {
    pointer-events: none;
}

/* hiệu ứng khi hover */
button:hover {

}
/* hiệu ứng khi press */
button:active {

}
</style>
