<template>
    <div class="problem-console">
        <div class="console-window" v-show="showConsole">
            <TabBar
                :tabBarList="['Test case', 'Run code result', 'Submission']"
                class="tab-bar"
                :selected="consoleSelected"
                @selectUpdated="
                    (value) => {
                        consoleSelected = value;
                    }
                "
            >
                <template v-slot:Testcase>
                    <TestCase :testCases="testCases" />
                </template>
                <template v-slot:Runcoderesult>
                    <!-- <RunCode :runCodeResult="runCodeResult" /> -->
                </template>
                <template v-slot:Submission>
                    <Submission :submission="{ ...submission }" />
                </template>
            </TabBar>
        </div>
        <div class="console-button" @click="showConsole = !showConsole">
            <span>console</span>
            <i
                :class="'fas fa-caret-down ' + (showConsole ? 'flipped' : '')"
            ></i>
        </div>
        <Button @click="submit" class="button">
            <span v-if="!isSubmitting">{{ translate("submit") }}</span>
            <LoadingIcon v-else />
        </Button>
        <Button @click="runCode" class="button">
            <span v-if="!isRunning">{{ translate("run code") }}</span>
            <LoadingIcon v-else />
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

import SubmissionModel from "../../../model/coreProblem/submission";
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
                const submission = SubmissionModel.create();
                submission.setCode(
                    this.$store.state.problem.currentProblemsCode[
                        this.problem.getId()
                    ]
                );
                submission.setProgrammingLanguage(
                    this.$store.state.general.editorSettings.language
                );
                submission.setProblemId(this.$route.params.id);

                this.submission = await submit("123-abc-xyz", submission);

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
    display: flex;
    align-items: center;
    background-color: var(--container-color);
    .console-window {
        position: absolute;
        bottom: var(--nav-height);
        left: -1px;
        right: -1px;
        height: 50vh;
        overflow: hidden;
        background-color: var(--body-color);
        border: 1px solid var(--stroke-color);
        border-bottom: none;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .console-button {
        width: fit-content;
        margin-right: auto;
        margin-left: 10px;
        min-width: 5rem;
        padding: 5px;
        border: 1px solid var(--stroke-color);
        background: var(--container-color);
        border-radius: 10px;
        cursor: pointer;

        p {
            display: inline-block;
        }

        i {
            display: inline-block;
            margin-left: 10px;
        }

        .flipped {
            transform: rotate(180deg);
        }
    }

    .button {
        margin-right: 10px;
    }
}
</style>