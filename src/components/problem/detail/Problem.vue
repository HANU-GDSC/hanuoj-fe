<template>
    <div class="problem-detail">
        <Loading v-if="firstLoading" />
        <ProblemNotFound v-if="problemNotFound" />
        <div class="content" v-if="!firstLoading && !problemNotFound">
            <div class="header" v-show="!fullScreen">
                <ProblemHeader :problem="problem" />
            </div>
            <div class="left" v-show="!fullScreen">
                <ProblemLeft :problem="problem" />
            </div>
            <div :class="fullScreen ? 'right right-full-screen' : 'right'">
                <ProblemRight
                    :fullScreen="fullScreen"
                    :runCodeResult="runCodeResult"
                    :problem="problem"
                    @enterFullScreen="fullScreen = true"
                    @exitFullScreen="fullScreen = false"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProblemHeader from "./ProblemHeader";
import ProblemLeft from "./ProblemLeft";
import ProblemRight from "./ProblemRight";
import Loading from "../../Loading";
import ProblemNotFound from "./ProblemNotFound";

import { getProblem } from "../../../model/coreProblem/domainLogic/problem";

import errorHandler from "../../../helpers/errorHandler";
import converter from "../../../utils/languageConverter";

export default {
    name: "problem",
    data() {
        return {
            firstLoading: true,
            problemNotFound: false,
            fullScreen: false,
            problem: {},
            testCases: {},
            runCodeResult: {
                status: "Accepted",
            },
        };
    },
    components: {
        ProblemHeader,
        ProblemLeft,
        ProblemRight,
        Loading,
        ProblemNotFound,
    },
    methods: {},
    async created() {
        try {
            // __________create a problem__________
            this.problem = await getProblem(this.$route.params.id);

            this.firstLoading = false;

            // __________restore the code of problem from local storage (if exist)__________
            this.$store.dispatch("problem/setCurrentProblemsCode", {
                id: this.problem.getId(),
                code: localStorage.getItem("problemID: " + this.problem.getId())
                    ? JSON.parse(
                          localStorage.getItem("problemID: " + this.problem.getId())
                      )["code"]
                    : "",
            });
            // __________monaco editor settings__________
            let currentSettings = JSON.parse(
                localStorage.getItem("editorSettings")
            );
            if (!currentSettings) currentSettings = {};
            const defaultSettings = {
                fontSize: "15px",
                fontFamily: "monospace", //[Times New Roman | monospace | Courier New | Papyrus | Georgia | Trebuchet MS | Tahoma]
                fontWeight: "normal", //[normal | bold]
                lineHeight: 20,
                // other
                wordWrap: false,
                lineNumbers: true,
                // no change
                scrollBeyondLastLine: true,
                folding: true,
                foldingHighlight: true,
                tabCompletion: "on",
                automaticLayout: true,
                cursorBlinking: "phase", // [blink | smooth | phase | solid | expand]
                // not an option
                language: converter(
                    this.problem.getAllowedProgrammingLanguages()[0]
                ),
            };

            const settingToSave = {};
            Object.keys(defaultSettings).forEach((key) => {
                settingToSave[key] =
                    typeof currentSettings[key] !== "undefined"
                        ? currentSettings[key]
                        : defaultSettings[key];
            });
            this.$store.dispatch("general/setEditorSettings", settingToSave);

            // __________handle resize__________
            this.$nextTick(() => {
                const left = this.$el.getElementsByClassName("left")[0];
                const right = this.$el.getElementsByClassName("right")[0];
                const observer = new MutationObserver((mutations) => {
                    right.style.width = `calc(100% - 45px - ${left.style.width})`;
                    if (left.style.display === "none")
                        right.removeAttribute("style");
                });
                observer.observe(left, {
                    attributes: true,
                });
            });

        } catch (error) {
            this.problemNotFound = true;
            this.firstLoading = false;
            errorHandler(error);
            // return;
        }
    },
    watch: {},
};
</script>
<style lang="scss" scoped>
$header-height: 50px;
$left-width: 40%;
$margin: 15px;
.light-theme .problem-detail {
    background-color: var(--container-color-darker);
    .content > * {
        // box-shadow: 2px 2px 1px rgb(207, 207, 207);
    }
}
.dark-theme .problem-detail {
    .content > * {
        // box-shadow: 2px 2px 1px rgb(32, 36, 58);
    }
}
.problem-detail {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .content > * {
        border: 1px solid var(--line-color);
        border-radius: 10px;
    }
    .content {
        width: 100%;
        height: 100%;
        .header {
            position: relative;
            width: 100%;
            height: $header-height;
            border: none;
            box-shadow: none;
        }
        .left {
            position: relative;
            left: $margin;
            width: calc($left-width);
            height: calc(100% - $header-height - $margin);
            float: left;
            overflow: hidden;
            resize: horizontal;
            transition: resize 0s;
        }
        .right {
            position: relative;
            right: $margin;
            width: calc(100% - $left-width - $margin - $margin - $margin);
            height: calc(100% - $header-height - $margin);
            float: right;
            overflow: hidden;
            transition: width 0s;
        }
        .right-full-screen {
            float: none;
            right: 0;
            border-radius: 0;
            position: relative;
            width: calc(100%);
            height: calc(100%);
        }
    }
}
</style>