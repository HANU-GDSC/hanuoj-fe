<template>
    <div class="problem-header">
        <div class="back" @click="pushToProblem">
            <i class="fa-solid fa-arrow-left-long"></i>
        </div>
        <h2 class="problem-name">{{ problem.name }}</h2>
        <div class="problem-info">
            <div :class="'difficulty ' + problem.difficulty">
                {{ translate(problem.difficulty).toUpperCase() }}
            </div>
            <div class="like" @click="likeClicked">
                {{ like ? problem.likeCount + 1 : problem.likeCount }}
                <i :class="(like ? 'fa-solid' : 'fa-regular') + ' fa-thumbs-up'"></i>
            </div>
            <div class="dislike" @click="dislikeClicked">
                {{ dislike ? problem.dislikeCount + 1 : problem.dislikeCount }}
                <i :class="(dislike ? 'fa-solid' : 'fa-regular') + ' fa-thumbs-down'"></i>
            </div>
        </div>
    </div>
</template>

<script>
import translate from "../../../helpers/translate";

export default {
    name: "ProblemHeader",
    data() {
        return {
            like: false,
            dislike: false,
        };
    },
    props: {
        problem: Object,
    },
    methods: {
        pushToProblem() {
            this.$router.push("/problem");
        },
        likeClicked() {
            if (this.like)
                this.like = false;
            else {
                this.like = true;
                this.dislike = false;
            }
        },
        dislikeClicked() {
            if (this.dislike)
                this.dislike = false;
            else {
                this.dislike = true;
                this.like = false;
            }
        },
        translate(input) {
            return translate(input);
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
        border: 1px solid var(--line-color) !important;
        border-radius: 10px;
        display: flex;
        width: 230px;
        position: absolute;
        top: 10px;
        bottom: 10px;
        right: $margin;
        border: 1px;
        .EASY {
            color: rgb(43, 223, 43);
        }
        .MEDIUM {
            color: rgb(167, 167, 167);
        }
        .HARD {
            color: rgb(255, 70, 70);
        }
    }
    .problem-info > * {
        flex: 1 1 0px;
        text-align: center;
        line-height: 30px;
    }
    .problem-info:hover {
        cursor: pointer;
    }
    .problem-info > *:not(:last-child) {
        border-right: 1px solid var(--line-color);
    }
    h2 {
        text-align: center;
        height: 100%;
        line-height: 50px;
    }
}
</style>