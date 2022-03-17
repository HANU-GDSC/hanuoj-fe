<template>
    <div class="warper">
        <MonacoEditor
            class="monaco-editor"
            :language="language"
            :code="code"
            :theme="getTheme"
            :options="getOptions"
            @mounted="onMounted"
            @codeChange="onCodeChange"
            v-if="reCreate"
        >
        </MonacoEditor>
    </div>
</template>

<script>
import MonacoEditor from "vue-monaco-editor";

export default {
    name: "app",
    components: {
        MonacoEditor,
    },
    props: {
        language: String,
        code: {
            type: String,
            default: `your code go here`,
        },
    },
    data() {
        return {
            reCreate: true,
        };
    },
    methods: {
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeChange(editor) {
            this.$emit("dataUpdated", editor.getValue());
        },
    },
    computed: {
        getTheme() {
            return this.$store.state.general.theme === "dark-theme"
                ? "vs-dark"
                : "vs";
        },
        getOptions() {
            return this.$store.state.general.editorSettings;
        },
    },
    watch: {
        language() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
        },
        getOptions() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
        },
        getTheme() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
        },
    },
};
</script>
<style scoped>
</style>