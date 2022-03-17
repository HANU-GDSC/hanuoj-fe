<template>
    <div class="problem-right">
        <ProblemSetting
            class="setting"
            :fullScreen="fullScreen"
            :languageList="languages"
            @enterFullScreen="$emit('enterFullScreen')"
            @exitFullScreen="$emit('exitFullScreen')"
        />
        <MonacoEditor
            class="editor"
            :language="$store.state.general.editorSettings.language"
            :code="$store.state.problem.currentProblemsCode[problem.id]"
            @dataUpdated="
                $store.dispatch('problem/setCurrentProblemsCode', {
                    id: problem.id,
                    code: $event,
                })
            "
        />
        <ProblemConsole class="console" :runCodeResult="runCodeResult" />
    </div>
</template>

<script>
import ProblemSetting from "./ProblemRightSetting";
import ProblemConsole from "./ProblemRightConsole";
import MonacoEditor from "./MonacoEditor";
import converter from "../../../utils/languageConverter";
import translate from "../../../helpers/translate";

export default {
    name: "ProblemRight",
    props: {
        fullScreen: Boolean,
        runCodeResult: Object,
        problem: Object,
    },
    data() {
        return {};
    },
    components: {
        ProblemSetting,
        ProblemConsole,
        MonacoEditor,
    },
    computed: {
        languages() {
            return converter(this.problem.allowedProgrammingLanguages);
        },
        translate() {
            return translate()
        }
    },
    created() {

    }
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