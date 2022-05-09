<template>
    <div class="problem-header">
        <div class="back" @click="pushToProblem">
            <i class="fa-solid fa-arrow-left-long"></i>
        </div>
        <h2 class="problem-name">{{ name }}</h2>
    </div>
</template>

<script>
export default {
    name: "ProblemHeader",
    data() {
        return {};
    },
    props: {
        name: String,
    },
    methods: {
        pushToProblem() {
            this.$router.push("/problem");
        }
    }
};
</script>

<style lang="scss" scoped>
.problem-header {
    position: relative;
    width: 100%;
    height: 100%;
    .back {
        position: absolute;
        height: 70%;
        aspect-ratio: 1/1;
        top: 15%;
        left: 1%;
    }
    i {
        width: 100%;
        text-align: center;
        line-height: 210%;
    }
    h2 {
        text-align: center;
    }
}
</style>