<template>
    <div class="problem-console">
        <div class="console-window" v-show="showConsole">
            <TabBar
                :tabBarList="['run code result', 'submission']"
                class="tab-bar"
            >
                <template v-slot:runcoderesult>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quas molestias, magnam magni nihil quis
                        praesentium, sunt odit, fuga sapiente voluptate in
                        cumque suscipit! Culpa, omnis maxime suscipit illum
                        cupiditate cumque.
                    </p>
                </template>
                <template v-slot:submission> submition </template>
            </TabBar>
        </div>
        <div class="console-button" @click="showConsole = !showConsole">
            <p>console</p>
            <i
                :class="'fas fa-caret-down ' + (showConsole ? 'flipped' : '')"
            ></i>
        </div>

        <Button text="submit" class="button" />
        <Button text="run code" class="button" />
    </div>
</template>

<script>
import Button from "../../general/Button";
import TabBar from "./ProblemTabBar";

export default {
    name: "ProblemConsole",
    data() {
        return {
            showConsole: false,
        };
    },
    components: {
        Button,
        TabBar,
    },
};
</script>

<style lang="scss" scoped>
.problem-console {
    position: relative;
    .console-window {
        position: absolute;
        bottom: 100%;
        width: 100%;
        height: 50vh;
        background-color: var(--body-color);
        .tab-bar {
            height: 100%;
        }
    }
    .console-button {
        float: left;
        width: 20%;
        margin: 0 10px;
        p {
            display: inline-block;
        }
        i {
            display: inline-block;
            line-height: 35px;
            margin-left: 10px;
        }
        .flipped {
            transform: rotate(180deg);
        }
    }
    .console-button:hover {
        cursor: pointer;
    }
    .button {
        float: right;
        margin: 0 5px;
    }
}
</style>