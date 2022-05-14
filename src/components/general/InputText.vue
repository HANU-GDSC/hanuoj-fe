<template>
    <input
        type="text"
        :disabled="disable"
        :required="require"
        :placeholder="placeholder"
        :value="value"
        @input="dataUpdated"
    />
</template>

<script>
export default {
    name: "InputText",
    props: {
        value: {
            type: String,
            default: "",
        },
        disable: {
            type: Boolean,
            default: false,
        },
        require: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
    methods: {
        dataUpdated(event) {
            this.$emit("dataUpdated", event.target.value);
        },
    },
};
</script>

<style lang="scss" scoped>
input {
	border-radius: 10px;
    padding: var(--padding-default);
	color: var(--text-color);
    font-weight: var(--font-medium);
    background: var(--container-color);
}
input::placeholder {
    color: var(--first-color-second);
    font-weight: var(--font-medium);
}
.light-theme input {
    border: 1px solid var(--stroke-color);
}

</style>
