<template>
    <div class="problem-right">
        <ProblemSetting
            class="setting"
            :editorSetting="editorSetting"
            :fullScreen="fullScreen"
            :languageList="['java', 'javascript', 'python', 'c', 'c++']"
            @enterFullScreen="$emit('enterFullScreen')"
            @exitFullScreen="$emit('exitFullScreen')"
        />
        <MonacoEditor class="editor" :language="editorSetting.language" />
        <ProblemConsole class="console" :runCodeResult="runCodeResult" />
    </div>
</template>

<script>
import ProblemSetting from "./problemRightSetting";
import ProblemConsole from "./ProblemRightConsole";
import MonacoEditor from "./MonacoEditor";

export default {
    name: "ProblemRight",
    props: {
        fullScreen: Boolean,
        runCodeResult: Object,
    },
    data() {
        return {
            editorSetting: {
                language: "java",
            },
        };
    },
    components: {
        ProblemSetting,
        ProblemConsole,
        MonacoEditor,
    },
};
</script>

<style lang="scss" scoped>
.problem-right {
    position: relative;
    width: 100%;
    height: 100%;
    .setting {
        width: 100%;
        height: 40px;
        border-bottom: 1px solid var(--line-color);
    }
    .editor {
        width: 100%;
        height: calc(100% - 80px);
    }
    .console {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        vertical-align: bottom;
        border-top: 1px solid var(--line-color);
    }
}
</style>