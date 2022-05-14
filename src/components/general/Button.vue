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
                this.$emit("clicked");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
button {
    min-width: 5rem;
    border-radius: 10px;
    padding: var(--padding-default);
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
.light-theme .darker {
    color: #fff;
    background-color: var(--first-color-alt);
}
.dark-theme .darker {
    color: var(--first-color-alt);
    background-color: #fff;
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
