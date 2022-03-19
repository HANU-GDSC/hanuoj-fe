<template>
    <div class="problem-console">
        <div class="console-window" v-show="showConsole">
            <TabBar
                :tabBarList="['test case', 'run code result', 'submission']"
                class="tab-bar"
                :selected="consoleSelected"
                @selectUpdated="
                    (value) => {
                        consoleSelected = value;
                    }
                "
            >
                <template v-slot:testcase>
                    <TestCase :testCases="problem.testCases" />
                </template>
                <template v-slot:runcoderesult>
                    <RunCode :runCodeResult="runCodeResult" />
                </template>
                <template v-slot:submission>
                    <Submission :submission="submission" />
                </template>
            </TabBar>
        </div>
        <div class="console-button" @click="showConsole = !showConsole">
            <p>console</p>
            <i
                :class="'fas fa-caret-down ' + (showConsole ? 'flipped' : '')"
            ></i>
        </div>

        <p
            text="submit"
            @click="submit"
            :class="'button ' + (isSubmitting ? '' : 'hover-effect')"
        >
            <span v-if="!isSubmitting">{{ translate("submit") }}</span
            ><LoadingIcon v-else />
        </p>
        <p
            text="run-code"
            @click="runCode"
            :class="'button ' + (isRunning ? '' : 'hover-effect')"
        >
            <span v-if="!isRunning">{{ translate("run code") }}</span
            ><LoadingIcon v-else />
        </p>
    </div>
</template>

<script>
import TabBar from "./ProblemTabBar";
import TestCase from "./ProblemRightConsoleTestCase";
import RunCode from "./ProblemRightConsoleRunCode";
import Submission from "./ProblemRightConsoleSubmission";
import LoadingIcon from "../../general/LoadingIcon";
import translate from "../../../helpers/translate";
import apiService from "../../../helpers/apiService";
import errorHandler from "../../../helpers/errorHandler";

export default {
    name: "ProblemConsole",
    props: {
        runCodeResult: Object,
        problem: Object,
    },
    data() {
        return {
            isSubmitting: false,
            isRunning: false,
            showConsole: false,
            submission: {},
            consoleSelected: 0,
        };
    },
    methods: {
        runCode() {
            if (this.isRunning) return;
            this.isRunning = true;
        },
        async submit() {
            if (this.isSubmitting) return;
            this.isSubmitting = true;
            const ProblemResult = {
                practiceProblemId: this.problem.practiceProblemId,
                inputService: {
                    coderId: "123-abc-xyz",
                    problemId: this.problem.id,
                    code: this.$store.state.problem.currentProblemsCode[
                        this.problem.id
                    ],
                    programmingLanguage:
                        this.$store.state.general.editorSettings.language,
                },
            };
            try {
                console.log("sending result", ProblemResult);
                const res = await apiService(
                    "POST",
                    "/submit",
                    {},
                    ProblemResult
                );
                this.isSubmitting = false;
                const submission = res.data.data; // mockApi response
                console.log("submission: ", submission);
                this.submission = submission;
                this.showConsole = true;
                this.consoleSelected = 2;
            } catch (error) {
                this.isSubmitting = false;
                errorHandler(error);
            }
        },
        translate(input) {
            return translate(input);
        },
    },
    components: {
        TabBar,
        RunCode,
        TestCase,
        Submission,
        LoadingIcon,
    },
};
</script>

<style lang="scss" scoped>
.problem-console {
    position: relative;
    .console-window {
        position: absolute;
        bottom: calc(100% + 1px);
        width: 100%;
        height: 50vh;
        background-color: var(--body-color);
        overflow: hidden;
        .tab-bar {
            height: 100%;
            .test-case {
                padding: 10px;
            }
            .run-code-result {
                padding: 10px;
            }
        }
    }
    .console-button {
        float: left;
        width: 20%;
        margin: 0 10px;
        p {
            display: inline-block;
        }
        i {
            display: inline-block;
            line-height: 35px;
            margin-left: 10px;
        }
        .flipped {
            transform: rotate(180deg);
        }
    }
    .console-button:hover {
        cursor: pointer;
    }
    .button {
        float: right;
        display: block;
        padding: 2px 0;
        margin-right: 5px;
        margin-top: 4.5px;
        width: 100px;
        text-align: center;
        border: 1px solid var(--line-color);
        transition: all 0.2s;
    }
    .button.hover-effect:hover {
        cursor: pointer;
        background-color: var(--container-color);
    }
    p[text="submit"] {
        border-bottom-right-radius: 5px;
    }
}
.light-theme .problem-console .button.hover-effect:hover {
    box-shadow: 2px 2px 1px rgb(207, 207, 207);
}
.dark-theme .problem-console .button.hover-effect:hover {
    box-shadow: 2px 2px 1px rgb(58, 58, 58);
}
</style>