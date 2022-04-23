<template>
    <div class="problem-left">
        <TabBar
            :tabBarList="['problem', 'solution', 'discussion', 'submission']"
            class="tab-bar"
            notBorder="top"
            :selected="tabBarSelected"
            @selectUpdated="
                (value) => {
                    tabBarSelected = value;
                }
            "
        >
            <template v-slot:problem>
                <MarkdownRender :description="problem.getDescription()" class="problem-description" />
            </template>
            <template v-slot:solution>
                <p>solution</p>
            </template>
            <template v-slot:discussion>
                <p>discussion</p>
            </template>
            <template v-slot:submission>
                <Submissions />
            </template>
        </TabBar>
    </div>
</template>

<script>
import TabBar from "./ProblemTabBar";
import MarkdownRender from "../../general/MarkdownRender";
import Submissions from "./ProblemLeftSubmissions";

export default {
    name: "ProblemLeft",
    props: {
        problem: Object,
        tabBarSelected: 0,
    },
    components: {
        TabBar,
        MarkdownRender,
        Submissions
    },
};
</script>

<style lang="scss" scoped>
.problem-left {
    width: 100%;
    height: 100%;
    .problem-description {
        padding: 10px;
    }
}
.tab-bar {
    height: 100%;
}
</style>