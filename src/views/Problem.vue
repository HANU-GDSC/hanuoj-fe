<template>
    <div class="problems">
        <MainLayout>
            <template v-slot:left>
                <Loading v-if="loading" />
                <div class="problem" v-else>
                    <table class="problem__area">
                        <tbody>
                            <tr class="prolem__lists problem__title">
                                <td class="problem__collumn1">ID</td>
                                <td class="problem__collumn2">Name</td>
                                <td class="problem__collumn3">Acceptance</td>
                                <td class="problem__collumn4">Difficulty</td>
                                <td class="problem__collumn5">Tags</td>
                                <td class="problem__collumn6">Status</td>
                            </tr>
                            <template v-for="(problem, index) in problemList">
                                <tr
                                    class="problem__item"
                                    :key="index"
                                    v-if="
                                        (currentPage - 1) * 10 < index &&
                                        index <= (currentPage - 1) * 10 + 10
                                    "
                                >
                                    <td class="problem__collumn1">
                                        {{ index }}
                                    </td>
                                    <td class="problem__collumn2">
                                        {{ problem.name }}
                                    </td>
                                    <td class="problem__collumn3">50%</td>
                                    <td class="problem__collumn4">
                                        {{ problem.difficulty }}
                                    </td>
                                    <td class="problem__collumn5">New</td>
                                    <td class="problem__collumn6">Done</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="pagelist">Pagelist</div>
            </template>

            <template v-slot:right>
                <p>sidebar go here</p>
            </template>
        </MainLayout>
    </div>
</template>

<script>
import MainLayout from "../components/MainLayout";
import Loading from "../components/Loading";
import { listProblems } from "../model/practiceProblem/domainLogic/problem";
import errorHandler from "../helpers/errorHandler";
import { getProblemById } from "../model/practiceProblem/domainLogic/coreProblem/problem";

export default {
    name: "Problem",
    data() {
        return {
            loading: true,
            currentPage: 1,
            problemList: [],
        };
    },
    components: {
        Loading,
        MainLayout,
    },
    async created() {
        await this.getProblems(1);
        this.loading = false;
    },

    methods: {
        async getProblems(currentPage) {
            try {
                this.loading = true;
                const listData = await listProblems(currentPage - 1, 10);
                this.loading = false;

                const coreProblemPromise = [];

                for (let i = 0; i < listData.length; i++) {
                    this.problemList[(currentPage - 1) * 10 + i + 1] = {
                        id: (currentPage - 1) * 10 + i + 1,
                        difficulty: listData[i].getDifficulty(),
                    };

                    coreProblemPromise.push(
                        getProblemById(listData[i].getCoreProblemProblemId())
                    );
                    console.log(listData[i]);
                }

                const coreProblems = await Promise.all(coreProblemPromise);
                coreProblems.forEach((coreProblem, i) => {
                    this.problemList[(currentPage - 1) * 10 + i + 1].name =
                        coreProblem.getName();
                });

                console.log(this.problemList);
            } catch (error) {
                errorHandler(error);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
td {
    text-align: center;
    vertical-align: middle;
}
.problem {
    margin: 20px;
    padding: 20px;
    border: 1px solid var(--stroke-color);
    border-radius: 20px;
    &__area {
        border-collapse: separate;
        border-spacing: 0 11px;
        width: 100vh;

        margin: 0 auto;
    }

    &__title {
        font-weight: var(--font-semibold);
    }

    &__item {
        font-weight: var(--font-medium);
        td {
            border: 1px solid var(--stroke-color);
            border-style: solid none;
        }
        td:first-child {
            border-left-style: solid;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        td:last-child {
            border-right-style: solid;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
        }
        &:hover {
            color: var(--first-color-alt);
            border-color: var(--first-color-alt);
        }
    }

    &__collumn1 {
        width: 5%;
        padding: 5px 0;
    }
    &__collumn2 {
        width: 20%;
    }
    &__collumn3 {
        width: 10%;
    }
    &__collumn4 {
        width: 15%;
    }
    &__collumn5 {
        width: 15%;
    }
    &__collumn6 {
        width: 10%;
    }
}
</style>
