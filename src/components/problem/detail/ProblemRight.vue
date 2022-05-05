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
            :code="$store.state.problem.currentProblemsCode[problem.getId()]"
            @dataUpdated="
                $store.dispatch('problem/setCurrentProblemsCode', {
                    id: problem.getId(),
                    code: $event,
                })
            "
        />
        <ProblemConsole class="console" :problem="problem"/>
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
            return this.problem.getAllowedProgrammingLanguages();
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
        height: 50px;
        border-bottom: 1px solid var(--line-color);
    }
    .editor {
        width: 100%;
        height: calc(100% - 100px);
    }
    .console {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        vertical-align: bottom;
        border-top: 1px solid var(--line-color);
    }
}
</style>