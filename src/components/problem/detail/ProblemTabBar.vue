<template>
    <div :class="'tab-bar'">
        <div class="nav">
            <div
                v-for="(item, index) in tabBarList"
                :class="'nav-item ' + (selected === index ? 'selected' : '')"
                :key="index"
                @click="switchTab(index)"
            >
                <p>{{ translate(item) }}</p>
            </div>
        </div>
        <div class="content">
            <div
                v-for="(item, index) in tabBarList"
                :key="index"
                :class="'content-item ' + item"
                v-show="index === selected"
            >
                <slot :name="rmSpace(item)"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { removeSpace } from "../../../utils/removeSpace";
import translate from "../../../helpers/translate";

export default {
    name: "TabBar",
    props: {
        tabBarList: Array,
        notBorder: String,
        selected: {
            type: Number,
            default: 0,
        },
    },
    // data() {
    //     return {
    //         selected: this.tabBarList[0],
    //     };
    // },
    methods: {
        rmSpace(str) {
            // remove space in string
            return removeSpace(str);
        },
        translate(input) {
            return translate(input, "en");
        },
        switchTab(index) {
            this.$emit("selectUpdated", index);
        },
    },
};
</script>

<style lang="scss" scoped>
.tab-bar {
    height: 100%;
    background-color: var(--container-color);
    .nav {
        display: table;
        height: var(--nav-height);
        table-layout: fixed;
        font-weight: var(--font-semi-bold);
        overflow: hidden;
        .nav-item {
            display: table-cell;
            width: 2%;
            text-align: center;
            line-height: var(--nav-height);
            border-bottom: 1px solid var(--stroke-color);
            background-color: var(--container-color-darker);
            cursor: pointer;
        }
        .selected {
            p {
                color: var(--text-color);
            }
        }
    }
    .content {
        height: calc(100% - var(--nav-height));
        background-color: var(--container-color);
        .content-item {
            overflow-y: auto;
            height: 100%;
        }
    }
    // scroll bar
    .content {
        .content-item::-webkit-scrollbar-thumb {
            display: none;
        }
        .content-item::-webkit-scrollbar:vertical {
            border-left: 1px solid var(--stroke-color);
            background: var(--container-color);
        }
        .content-item::-webkit-scrollbar:horizontal {
            border-top: 1px solid var(--stroke-color);
            background: var(--container-color);
        }
    }
    .content:hover .content-item::-webkit-scrollbar-thumb {
        display: block;
    }
    .content .content-item:last-child::-webkit-scrollbar {
        border-top: 1px solid var(--stroke-color);
    }
}
</style>