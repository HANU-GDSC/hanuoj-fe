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
                    <TestCase :testCases="testCases" />
                </template>
                <template v-slot:runcoderesult>
                    <!-- <RunCode :runCodeResult="runCodeResult" /> -->
                </template>
                <template v-slot:submission>
                    <Submission :submission="{ ...submission }" />
                </template>
            </TabBar>
        </div>
        <div class="console-button" @click="showConsole = !showConsole">
            <p>console</p>
            <i
                :class="'fas fa-caret-down ' + (showConsole ? 'flipped' : '')"
            ></i>
        </div>
        <Button @click="submit" class="button">
            <span v-if="!isSubmitting">{{ translate("submit") }}</span
            ><LoadingIcon v-else />
        </Button>
        <Button @click="runCode" class="button">
            <span v-if="!isRunning">{{ translate("run code") }}</span
            ><LoadingIcon v-else />
        </Button>
    </div>
</template>

<script>
import TabBar from "./ProblemTabBar";
import TestCase from "./ProblemRightConsoleTestCase";
import RunCode from "./ProblemRightConsoleRunCode";
import Submission from "./ProblemRightConsoleSubmission";
import LoadingIcon from "../../general/LoadingIcon";
import Button from "../../general/Button";

import { getTestCases } from "../../../model/coreProblem/domainLogic/testCase";
import { submit } from "../../../model/coreProblem/domainLogic/submission";

import translate from "../../../helpers/translate";
import errorHandler from "../../../helpers/errorHandler";

export default {
    name: "ProblemConsole",
    props: {
        problem: Object,
    },
    data() {
        return {
            isSubmitting: false,
            isRunning: false,
            showConsole: false,
            submission: {},
            consoleSelected: 0,
            testCases: [],
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
            try {
                this.submission = await submit(
                    "123-abc-xyz",
                    this.$store.state.problem.currentProblemsCode[
                        this.problem.getId()
                    ],
                    this.$store.state.general.editorSettings.language,
                    this.$route.params.id
                );
                this.isSubmitting = false;
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
        Button,
    },
    async created() {
        this.testCases = await getTestCases(this.problem.getId());
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
        line-height: 50px;
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
    }
}
</style>