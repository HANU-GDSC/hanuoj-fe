<template>
    <div class="warper">
        <MonacoEditor
            class="monaco-editor"
            :language="language"
            :code="code"
            :theme="getTheme"
            :options="options"
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
        language: String
    },
    data() {
        return {
            reCreate: true,
            code: `public class BogoSort {\r\n    void bogoSort(int[] a) {\r\n        while (isSorted(a) == false)\r\n            shuffle(a);\r\n    }\r\n  \r\n    void shuffle(int[] a) {\r\n         for (int i=1; i <= n; i++)\r\n             swap(a, i, (int)(Math.random()*i));\r\n    }\r\n  \r\n    void swap(int[] a, int i, int j) {\r\n        int temp = a[i];\r\n        a[i] = a[j];\r\n        a[j] = temp;\r\n    }\r\n  \r\n    boolean isSorted(int[] a) {\r\n        for (int i=1; i<a.length; i++)\r\n            if (a[i] < a[i-1])\r\n                return false;\r\n        return true;\r\n    }\r\n  \r\n    void printArray(int[] arr) {\r\n        for (int i=0; i<arr.length; i++)\r\n            System.out.print(arr[i] + \" \");\r\n        System.out.println();\r\n    }\r\n  \r\n    public static void main(String[] args) {\r\n        int[] a = {3, 2, 5, 1, 0, 4};\r\n        BogoSort ob = new BogoSort();\r\n  \r\n        ob.bogoSort(a);\r\n  \r\n        System.out.print(\"Sorted array: \");\r\n        ob.printArray(a);\r\n    }\r\n}`,
            options: {
                selectOnLineNumbers: false,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                wordWrapColumn: 80,
                wrappingIndent: "indent",
                wordWrapBreakBeforeCharacters:
                    "([{‘“〈《「『【〔（［｛｢£¥＄￡￥+＋",
            },
        };
    },
    methods: {
        onMounted(editor) {
            this.editor = editor;
        },
        onCodeChange(editor) {
            console.log(editor.getValue());
        },
    },
    computed: {
        getTheme() {
            return this.$store.state.general.theme === "dark-theme" ? "vs-dark" : "vs";
        }
    },
    watch: {
        language() {
            this.reCreate = false;
            setTimeout(() => {
                this.reCreate = true;
            }, 0);
        },
    },
};
</script>
<style scoped>
.monaco-editor {
}
</style>