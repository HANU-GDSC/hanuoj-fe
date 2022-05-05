<template>
    <div class="problems">
        <MainLayout>
            <template v-slot:left>
                <div class="problem">
                    <table>
                        <div class="problem__header">
                                <td class="problem__collumn1">ID</td>
                                <td class="problem__collumn2">Name</td>
                                <td class="problem__collumn3">Acceptance</td>
                                <td class="problem__collumn4">Diffculty</td>
                                <td class="problem__collumn5">Tags</td>
                                <td class="problem__collumn6">Status</td>
                        </div>
                    </table>

                    <table>
                        <div class="problem__body">
                                    <td class="problem__collumn1">01</td>
                                    <td class="problem__collumn2">Vue Props</td>
                                    <td class="problem__collumn3">50%</td>
                                    <td class="problem__collumn4">Easy</td>
                                    <td class="problem__collumn5">Low</td>
                                    <td class="problem__collumn6">Done</td>
                        </div>
                    </table>
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

export default {
    name: "Problem",
    components: {
        MainLayout,
    },
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
        padding-left: 2rem;
        padding-right: 2rem;

        &__header{
            font-size: $h3-font-size;
            color: $first-color;
            padding: 1rem 1rem;
        }

        &__row{
            width: 100%;
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