<template>
    <input
        type="number"
        :disabled="disable"
        :required="require"
        :placeholder="placeholder"
        :value="value"
        @input="dataUpdated"
    />
</template>

<script>
export default {
    name: "InputNum",
    props: {
        value: {
            type: Number,
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
