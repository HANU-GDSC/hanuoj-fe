<template>
    <div class="problem-detail">
        <Loading v-if="loading" />
        <div class="content" v-else>
            <div class="header">
                <ProblemHeader name="add two sum"/>
            </div>
            <div class="left">
                <ProblemLeft />
            </div>
            <div class="right">
                <ProblemRight />
            </div>
        </div>
    </div>
</template>

<script>
import ProblemHeader from "./ProblemHeader";
import ProblemLeft from "./ProblemLeft";
import ProblemRight from "./ProblemRight";
import Loading from "../../Loading";

export default {
    name: "problem",
    data() {
        return {
            loading: false,
        };
    },
    components: {
        ProblemHeader,
        ProblemLeft,
        ProblemRight,
        Loading,
    },
    created() {
        // current router id
        console.log(this.$route.params.id);
    },
};
</script>
<style lang="scss" scoped>
$header-height: 40px;
$left-width: 450px;
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
    }
}
</style>