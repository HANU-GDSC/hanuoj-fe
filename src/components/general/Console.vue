<template>
    <pre class="console" :style="`max-height: calc(20px*${maxLine} + 20px);`">
        {{ text }}
    </pre>
</template>

<script>
export default {
    name: "Console",
    props: {
        text: String,
        maxLine: {
            type: Number,
            default: 3,
        }
    },
};
</script>

<style lang="scss" scoped>
$lh: 19px;
.console {
    font-family: "Courier New", monospace;
    white-space: pre-line;
    padding: 10px;
    line-height: $lh;
    overflow-y: auto;
    background-color: var(--container-color-darker);
    border: 1px solid var(--line-color);
    font-weight: bold;
}
</style>