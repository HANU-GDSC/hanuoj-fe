<template>
    <div class="problem-left">
        <TabBar
            :tabBarList="[
                'description',
                'solution',
                'discussion',
                'submission',
            ]"
            class="tab-bar"
        >
            <template v-slot:description>
                <div class="scroll">
                    <p>
                        BogoSort, also known stupid sort or monkey sort, is a
                        particularly ineffective algorithm based on generate and
                        test paradigm. The algorithm successively generates
                        permutations of its input until it finds one that is
                        sorted
                    </p>
                </div>
            </template>
            <template v-slot:solution>
                <p>solution</p>
            </template>
            <template v-slot:discussion>
                <p>discussion</p>
            </template>
            <template v-slot:submission>
                <p>submission</p>
            </template>
        </TabBar>
    </div>
</template>

<script>
import TabBar from "./ProblemTabBar";
export default {
    name: "ProblemLeft",
    components: {
        TabBar,
    },
};
</script>

<style scoped>
.problem-left {
    width: 100%;
    height: 100%;
}
.tab-bar {
    height: 100%;
}
</style>