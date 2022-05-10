<template>
    <div class="problems">
        <MainLayout>
            <template v-slot:left>
                <Loading v-if="loading" />
                <div class="problem" v-else>
					<div class="problem__list">
						<table>
                            <tr class="header">
								<td class="problem__collumn1">ID</td>
								<td class="problem__collumn2">Name</td>
								<td class="problem__collumn3">Acceptance</td>
								<td class="problem__collumn4">Difficulty</td>
								<td class="problem__collumn5">Tags</td>
								<td class="problem__collumn6">Status</td>
							</tr>
							<div
								v-for="(problem, index) in problemList"
								class="body" :key="index"
							>
                
							<tr
								v-if="(currentPage - 1)*10 < index && index <= (currentPage - 1)*10 + 10"
							>
								<td class="problem__collumn1">{{index}}</td>
								<td class="problem__collumn2">Name</td>
								<td class="problem__collumn3">Acceptance</td>
								<td class="problem__collumn4">{{problem.difficulty}}</td>
								<td class="problem__collumn5">Tags</td>
								<td class="problem__collumn6">Status</td>
							</tr>
							</div>
						</table>

                        <div class="pagelist"></div>
					</div>
                </div>

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
import {listProblems} from "../model/practiceProblem/domainLogic/practiceProblem";
import errorHandler from "../helpers/errorHandler";
import {GetCoreProblemResponseData} from "../model/coreProblem/api/getCoreProblemApi"
export default {
    name: "Problem",
    data() {
        return {
            loading: true,
			currentPage: 1,
			problemList: []
        }
    },
    components: {
        Loading,
        MainLayout,
    },
    async created() {
		await this.getProblems(1)
		this.loading = false
    },

	methods: {
		async getProblems(currentPage) {
			try {
				this.loading = true
				const listData = await listProblems(currentPage - 1, 10)
				this.loading = false
				console.log(listData);
				for (let i = 0; i < listData.length; i++) {
					this.problemList[(currentPage - 1) * 10 + i + 1] = {
						id: i,
						difficulty: listData[i].getDifficulty()
					}
				}
				console.log(this.problemList)
			} catch(error) {
				errorHandler(error);
			}
		}
	}
};
</script>

<style lang="scss" scoped>

    $first-color: #302F4E;
    $first-color-alt: #9288C1;
    $light-color: #C9C2E0;
    $h3-font-size: 1rem;
    $font-medium: 600;

    table{
        width: 100%;

         td {
        text-align: center;
        vertical-align: middle;
        font-weight: $font-medium;
    }
    }
    
   

    .problem{
        width: 100%;
        padding: 2rem;
        &__header{
            font-size: $h3-font-size;
            color: $first-color;
            padding: 1rem 1rem;
        }


        &__body{
            padding: 0.25rem 1rem;
            border: 2px solid $light-color;
            border-radius: 15px;
            color: $first-color-alt;
            width: 100%;

            &:hover{
                color: $first-color;
                border-color: $first-color-alt;
            }
        }



        &__collumn1{
            width: 5%;
        }
        &__collumn2{
            width: 20%;
        }
        &__collumn3{
            width: 20%;
        }
        &__collumn4{
            width: 10%;
        }
        &__collumn5{
            width: 10%;
        }
        &__collumn6{
            width: 10%;
        }

        
    }


</style> 