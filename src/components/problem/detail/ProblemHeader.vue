<template>
    <div class="problem-header">
        <div class="back" @click="pushToProblem">
            <i class="fa-solid fa-arrow-left-long"></i>
        </div>
        <h2 class="problem-name">{{ problem.name }}</h2>
        <div class="problem-info">
            <!-- <div class="difficulty">{{ problem.difficulty }}</div>
            <div class="like">{{ problem.likeCount }}</div>
            <div class="dislike">dislike</div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "ProblemHeader",
    data() {
        return {};
    },
    props: {
        problem: Object,
    },
    methods: {
        pushToProblem() {
            this.$router.push("/problem");
        }
    }
};
</script>

<style lang="scss" scoped>
$margin: 15px;

.problem-header {
    position: relative;
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    .back {
        position: absolute;
        height: 70%;
        aspect-ratio: 1/1;
        top: 15%;
        left: 1%;
    }
    .back {
        i {
            width: 100%;
            text-align: center;
            line-height: 210%;
        }
    }
    .back:hover {
        cursor: pointer;
    }
    .problem-info {
        display: flex;
        width: 230px;
        position: absolute;
        top: 10px;
        bottom: 10px;
        right: $margin;
        border: 1px;
    }
    .problem-info > * {
        border: 1px solid blue;
        flex: 1 1 0px;
        text-align: center;
        line-height: 30px;
    }
    h2 {
        text-align: center;
        height: 100%;
        line-height: 50px;
    }
}
</style>