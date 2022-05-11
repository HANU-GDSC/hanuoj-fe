<template>
    <MonacoEditor
        class="monaco-editor"
        :language="languageConvert(language)"
        :code="code"
        :theme="getTheme"
        :options="getOptions"
        @mounted="onMounted"
        @codeChange="onCodeChange"
        v-if="reCreate"
    >
    </MonacoEditor>
</template>

<script>
import MonacoEditor from "vue-monaco-editor";
import converter from "../../../utils/languageConverter";

function setBackground(self, bgColor) {
    let style =
        self.$store.state.general.theme === "dark-theme"
            ? getComputedStyle(document.getElementById("main"))
            : getComputedStyle(document.body);
    const editorBackground = self.$el.querySelector(
        ".monaco-editor-background.lines-content"
    );
    const sidebarBackground = self.$el.querySelector(".margin-view-overlays");
    const sidebarGlyphMargin = self.$el.querySelector(".glyph-margin");

    editorBackground.style.background = style.getPropertyValue(bgColor);
    sidebarBackground.style.background = style.getPropertyValue(bgColor);
    sidebarGlyphMargin.style.background = style.getPropertyValue(bgColor);
}

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
        languageConvert(language) {
            return converter(language);
        },
        setColor() {
            let editorBackground = null;
            let intervalId = setInterval(() => {
                editorBackground = this.$el.querySelector(
                    ".monaco-editor-background.lines-content"
                );
                if (editorBackground) {
                    clearInterval(intervalId);
                    setBackground(this, "--container-color");
                }
            }, 100);
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
    mounted() {
        this.setColor();
    },
    watch: {
        language() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
            // this.setColor();
        },
        getOptions() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
            this.setColor();
        },
        getTheme() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
            this.setColor();
        },
    },
};
</script>
<style scoped>
.monaco-editor {
    transition: none;
}
</style>