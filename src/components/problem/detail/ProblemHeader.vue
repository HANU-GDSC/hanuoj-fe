<template>
    <div class="problem-header">
        <div class="back" @click="pushToProblem">
            <i class="fa-solid fa-arrow-left-long"></i>
        </div>
        <h2 class="problem-name">{{ problem.getName() }}</h2>
        <div class="problem-info">
            <div :class="'difficulty ' + practiceProblem.getDifficulty()">
                {{ translate(practiceProblem.getDifficulty()).toUpperCase() }}
            </div>
            <div class="like" @click="likeClicked">
                {{ like ? likeCount + 1 : likeCount }}
                <i
                    :class="
                        (like ? 'fa-solid' : 'fa-regular') + ' fa-thumbs-up'
                    "
                ></i>
            </div>
            <div class="dislike" @click="dislikeClicked">
                {{ dislike ? dislikeCount + 1 : dislikeCount }}
                <i
                    :class="
                        (dislike ? 'fa-solid' : 'fa-regular') +
                        ' fa-thumbs-down'
                    "
                ></i>
            </div>
        </div>
    </div>
</template>

<script>

import { getPracticeProblem } from "../../../model/practiceProblem/domainLogic/practiceProblem";
import { getLike } from "../../../model/practiceProblem/domainLogic/like";
import { getDislike } from "../../../model/practiceProblem/domainLogic/dislike";
import PracticeProblem from "../../../model/practiceProblem/practiceProblem";
import Like from "../../../model/practiceProblem/like";
import Dislike from "../../../model/practiceProblem/dislike";

import translate from "../../../helpers/translate";
import errorHandler from "../../../helpers/errorHandler";

export default {
    name: "ProblemHeader",
    data() {
        return {
            like: false,
            likeCount: 0,
            dislike: false,
            dislikeCount: 0,
            practiceProblem: new PracticeProblem({
                difficulty: ""
            }),
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
            if (this.like) this.like = false;
            else {
                this.like = true;
                this.dislike = false;
            }
        },
        dislikeClicked() {
            if (this.dislike) this.dislike = false;
            else {
                this.dislike = true;
                this.like = false;
            }
        },
        translate(input) {
            return translate(input);
        },
    },
    async created() {
        try {
            const [practiceProblem, like, dislike] = await Promise.all([
                getPracticeProblem(this.$route.params.id),
                getLike(this.$route.params.id),
                await getDislike(this.$route.params.id)
            ])
            this.practiceProblem = practiceProblem;
            this.like = like.getLikeCount();
            this.dislike = dislike.getDislikeCount();
        } catch (error) {
            errorHandler(error);
        }
    },
};
</script>

<style lang="scss" scoped>
$margin: 15px;

.problem-header {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 15px;
    .back {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .problem-name {
        display: flex;
        align-items: center;
        margin-left: 15px;
    }
    .problem-info {
        border: 1px solid var(--stroke-color) !important;
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
        border-right: 1px solid var(--stroke-color);
    }
}
</style>