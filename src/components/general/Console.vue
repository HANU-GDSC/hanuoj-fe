<template>
    <pre class="console">
        {{ text }}
    </pre>
</template>

<script>
export default {
    name: "Console",
    props: {
        text: String,
    },
};
</script>

<style lang="scss" scoped>
.console {
    font-family: "Courier New", monospace;
    white-space: pre-line;
    padding: 10px;
    background-color: var(--container-color-darker);
    border: 1px solid var(--line-color);
    font-weight: bold;
}
</style>