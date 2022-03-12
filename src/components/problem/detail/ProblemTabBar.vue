<template>
    <div class="tab-bar">
        <div class="nav">
            <div
                v-for="(item, index) in tabBarList"
                :class="'nav-item ' + (selected === item ? 'selected' : '')"
                :key="index"
                @click="selected = item"
            >
                <p>{{ item }}</p>
            </div>
        </div>
        <div class="content">
            <div
                v-for="(item, index) in tabBarList"
                :key="index"
                :class="'content-item ' + item"
                v-show="item === selected"
            >
                <slot :name="rmSpace(item)"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { removeSpace } from "../../../utils/removeSpace";

export default {
    name: "TabBar",
    data() {
        return {
            selected: this.tabBarList[0],
        };
    },
    methods: {
        rmSpace(str) { // remove space in string
            return removeSpace(str);
        },
    },
    props: {
        tabBarList: Array,
    },
};
</script>

<style lang="scss" scoped>
$nav-height: 40px;
.tab-bar {
    .nav {
        display: table;
        height: $nav-height;
        table-layout: fixed;
        overflow: hidden;
        .nav-item {
            display: table-cell;
            width: 2%;
            text-align: center;
            line-height: $nav-height;
            border: 1px solid blue;
        }
        .nav-item:hover {
            cursor: pointer;
        }
        .selected {
            background-color: #b6b1ff;
        }
    }
    .content {
        height: calc(100% - $nav-height);
        .content-item {
            overflow-y: auto;
            height: 100%;
        }
    }
}
</style>