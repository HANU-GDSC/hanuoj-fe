<template>
    <div class="problem-detail">
        <Loading v-if="loading" />
        <div class="content" v-else>
            <div class="header" v-show="!fullScreen">
                <ProblemHeader name="Bogo Sort" />
            </div>
            <div class="left" v-show="!fullScreen">
                <ProblemLeft />
            </div>
            <div :class="fullScreen ? 'right-full-screen' : 'right'">
                <ProblemRight
                    :fullScreen="fullScreen"
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
            loading: false,
            fullScreen: false,
            problem: {},
        };
    },
    components: {
        ProblemHeader,
        ProblemLeft,
        ProblemRight,
        Loading,
    },
    methods: {
    },
    created() {
        let practiceProblemId = this.$route.params.id;
        // const problem
    },
};
</script>
<style lang="scss" scoped>
$header-height: 40px;
$left-width: 500px;
.problem-detail {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .content {
        width: 100%;
        height: 100%;
        .header {
            position: relative;
            width: 100%;
            height: $header-height;
        }
        .left {
            position: relative;
            width: $left-width;
            height: calc(100% - $header-height);
            float: left;
        }
        .right {
            position: relative;
            width: calc(100% - $left-width - 20px);
            height: calc(100% - 50px);
            float: right;
        }
        .right-full-screen {
            position: relative;
            width: 100%;
            height: 100%;
        }
    }
}
</style>