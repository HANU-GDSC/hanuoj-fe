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
            <div :class="fullScreen ? 'right-full-screen' : 'right'">
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
import apiService from "../../../helpers/apiService";
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
        // getting problem from sever
        try {
            const res = await apiService("GET", "/practiceProblem/practiceProblemDetail", {
                id: this.$route.params.id,
            });
            // Check if the problem not found
            if (res.data.code === "NOT_FOUND") {
                this.problemNotFound = true;
                this.firstLoading = false;
                return;
            }
            this.firstLoading = false;
            // get data
            const data = res.data.data;
            console.log("problem detail get: ", res.data);
            this.problem = {
                id: data.coreProblem.id,
                name: data.coreProblem.name,
                description: data.coreProblem.description,
                author: data.coreProblem.author,
                ACsCount: data.coreProblem.ACsCount, // TODO later
                submissionsCount: data.coreProblem.submissionsCount, // TODO later
                difficulty: data.coreProblem.difficulty,
                memoryLimits: data.coreProblem.memoryLimits,
                timeLimits: data.coreProblem.timeLimits,
                testCases: data.coreProblem.testCases,
                allowedProgrammingLanguages:
                    data.coreProblem.allowedProgrammingLanguages,
                version: data.coreProblem.version,
                practiceProblemId: data.practiceProblem.id,
                category: data.practiceProblem.category,
                likeCount: data.practiceProblem.likeCount,
                dislikeCount: data.practiceProblem.dislikeCount,
            };

            // set problem code
            this.$store.dispatch("problem/setCurrentProblemsCode", {
                id: this.problem.id,
                code: localStorage.getItem("problemID: " + this.problem.id)
                    ? JSON.parse(
                          localStorage.getItem("problemID: " + this.problem.id)
                      )["code"]
                    : "",
            });
        } catch (error) {
            this.problemNotFound = true;
            this.firstLoading = false;
            errorHandler(error);
            // return;
        }
        // editor setting
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
            //animate

            // no change
            scrollBeyondLastLine: true,
            folding: true,
            foldingHighlight: true,
            tabCompletion: "on",
            automaticLayout: true,
            cursorBlinking: "phase", // [blink | smooth | phase | solid | expand]

            // not an option
            language: converter(this.problem.allowedProgrammingLanguages[0]),
        };
        const settingToSave = {};
        Object.keys(defaultSettings).forEach((key) => {
            settingToSave[key] =
                typeof currentSettings[key] !== "undefined"
                    ? currentSettings[key]
                    : defaultSettings[key];
        });
        this.$store.dispatch("general/setEditorSettings", settingToSave);
    },
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
            // transition: none;
        }
        .right {
            position: relative;
            right: $margin;
            width: calc(100% - $left-width - $margin - $margin - $margin);
            height: calc(100% - $header-height - $margin);
            float: right;
            overflow: hidden;
        }
        .right-full-screen {
            position: relative;
            width: calc(100%);
            height: calc(100%);
        }
    }
}
</style>