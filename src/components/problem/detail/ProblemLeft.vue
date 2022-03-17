<template>
    <div class="problem-left">
        <TabBar
            :tabBarList="[
                'problem',
                'solution',
                'discussion',
                'submission',
            ]"
            class="tab-bar"
            notBorder="top"
        >
            <template v-slot:problem>
                <MarkdownRender :description="problem.description"/>
            </template>
            <template v-slot:solution>
                <p>solution</p>
            </template>
            <template v-slot:Discussion>
                <p>discussion</p>
            </template>
            <template v-slot:Submission>
                <p>submission</p>
            </template>
        </TabBar>
    </div>
</template>

<script>
import TabBar from "./ProblemTabBar";
import MarkdownRender from "../../general/MarkdownRender";

export default {
    name: "ProblemLeft",
    props: {
        problem: Object,
    },
    components: {
        TabBar,
        MarkdownRender,
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