<template>
    <div class="btn">
        <button
            :type="type"
            :title="des"
            :class="{ btnDisable: disable }"
            :disabled="disable"
            @click="click()"
        >
            {{ text }}
        </button>
    </div>
</template>

<script>
export default {
    name: "Button",

    props: {
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "Primary",
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

<style scoped>
/* default primary */
button {
    min-width: 5rem;
    height: 2.5rem;
    background-color: var(--first-color);
    border-radius: 10px;
    border: none;
	padding: 0 5px;
    color: #fff;
	margin: 5px;
}

/* secondary */

/* disable */
.btnDisable {
    pointer-events: none;
    background-color: #9fc1f9;
    color: #3077e8;
}

/* hiệu ứng khi hover */
button:hover {
    background-color: var(--first-color-darker);
    color: #fff;
}
/* hiệu ứng khi press */
button:active {
    transition-duration: 0s;
    background-color: var(--first-color-darker);
    border: 2px solid #9fc1f9;
    color: #fff;
}
</style>
