<template>
    <div>
        <MonacoEditor
            class="monaco-editor"
            language="javascript"
            :code="code"
            theme="vs"
            :editorOptions="options"
            @mounted="onMounted"
            @codeChange="onCodeChange"
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
        data() {
            return {
                code: "",
                options: {
                    selectOnLineNumbers: false,
                },
            };
        },
        methods: {
        onMounted (editor) {
            this.editor = editor
        },
        onCodeChange (editor) {
            // console.log(editor.getValue())
        }
        }
    };
</script>
<style scoped>
.monaco-editor {
    width: 600px !important;
    height: 600px !important;
}
</style>