<template>
    <div class="problem-left">
        <TabBar
            :tabBarList="['Problem', 'Solution', 'Discussion', 'Submission']"
            class="tab-bar"
            notBorder="top"
            :selected="tabBarSelected"
            @selectUpdated="
                (value) => {
                    tabBarSelected = value;
                }
            "
        >
            <template v-slot:Problem>
                <MarkdownRender :description="problem.getDescription()" class="problem-description" />
            </template>
            <template v-slot:Solution>
                <p>solution</p>
            </template>
            <template v-slot:Discussion>
                <p>discussion</p>
            </template>
            <template v-slot:Submission>
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
</style>