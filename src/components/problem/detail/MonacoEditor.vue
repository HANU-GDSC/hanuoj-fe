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
            code: `package lec.week5;\r\n\r\npublic class MergeSort {\r\n    public static void sort(int[] a, int N) {\r\n        mergeSort(a, 0, N - 1);\r\n    }\r\n    static void printArray(int[] a, int begin, int end) {\r\n        System.out.print(\"[\");\r\n        for (int i = begin; i <= end - 1; i++)\r\n            System.out.print(a[i] + \", \");\r\n        System.out.print(a[end] + \"]\");\r\n    }\r\n    static void mergeSort(int[] a, int left, int right) {\r\n        if (right > left) {\r\n            int mid = (left + right) / 2;\r\n            mergeSort(a, left, mid);\r\n            mergeSort(a, mid + 1, right);\r\n            merge(a, left, mid, mid + 1, right);\r\n        }\r\n    }\r\n    static void merge(int[] a, int left1, int right1, int left2, int right2) {\r\n        int[] tempArr = new int[right2 + 1];\r\n        int pivot1 = left1, pivot2 = left2;\r\n        for (int i = left1; i <= right2; i++) {\r\n            if (pivot1 > right1) {\r\n                tempArr[i] = a[pivot2];\r\n                pivot2++;\r\n                continue;\r\n            }\r\n            if (pivot2 > right2) {\r\n                tempArr[i] = a[pivot1];\r\n                pivot1++;\r\n                continue;\r\n            }\r\n            if (a[pivot1] < a[pivot2]) {\r\n                tempArr[i] = a[pivot1];\r\n                pivot1++;\r\n            } else {\r\n                tempArr[i] = a[pivot2];\r\n                pivot2++;\r\n            }\r\n        }\r\n        for (int i = left1; i <= right2; i++)\r\n            a[i] = tempArr[i];\r\n    }\r\n}\r\n`,
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