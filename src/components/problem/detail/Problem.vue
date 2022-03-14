<template>
    <div class="problem-detail">
        <Loading v-if="firstLoading" />
        <div class="content" v-if="!firstLoading">
            <div class="header" v-show="!fullScreen">
                <ProblemHeader name="Bogo Sort" />
            </div>
            <div class="left" v-show="!fullScreen">
                <ProblemLeft :problem="problem" />
            </div>
            <div :class="fullScreen ? 'right-full-screen' : 'right'">
                <ProblemRight
                    :fullScreen="fullScreen"
                    :runCodeResult="runCodeResult"
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
import apiService from "../../../helpers/apiService";
import errorHandler from "../../../helpers/errorHandler";

export default {
    name: "problem",
    data() {
        return {
            firstLoading: false,
            fullScreen: false,
            problem: {
                description:
                    "# Bogo sort\n\nGiven an array of integers ```nums``` and an integer ```N```, sort the given array in **ascending order**.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.\n\nYou can return the answer in any order.\n\nExample 1:\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n```\nExample 2:\n```\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n```\nExample 3:\n```\nInput: nums = [3,3], target = 6\nOutput: [0,1]\n```\nConstraints:\n- ```2 <= nums.length <= 104```\n- ```-109 <= nums[i] <= 109```\n- ```-109 <= target <= 109```\n- Only one valid answer exists.\n\n**Follow-up**: Can you come up with an algorithm that is less than ```O(n2)``` time complexity?\n",
            },
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
    },
    methods: {},
    created() {
        let practiceProblemId = this.$route.params.id;
        // const problem
    },
};
</script>
<style lang="scss" scoped>
$header-height: 42px;
$left-width: 40%;
$margin: 15px;
.light-theme .problem-detail {
    background-color: var(--container-color-darker);
    .content > * {
        box-shadow: 2px 2px 1px rgb(207, 207, 207);
    }
}
.dark-theme .problem-detail {
    .content > * {
        box-shadow: 2px 2px 1px rgb(58, 58, 58);
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