<template>
    <div class="problem-setting">
        <div class="choose-language">
            <Select
                :selectList="languageList ? languageList : defaultLanguages"
                :selected="editorSetting.language"
                @dataUpdated="languageChanged"
            />
        </div>
        <div
            class="retrieve-to-last-submission"
            title="retrieve to the last submission"
        >
            <i class="fa-solid fa-right-from-bracket"></i>
        </div>
        <div class="switch-mode" title="reset to default code">
            <i class="fa-solid fa-arrow-rotate-left"></i>
        </div>
        <div
            class="enter-full-screen"
            title="enter full screen"
            v-if="!fullScreen"
            @click="$emit('enterFullScreen')"
        >
            <i class="fa-solid fa-expand"></i>
        </div>
        <div
            class="exit-full-screen"
            title="exit full screen"
            v-if="fullScreen"
            @click="$emit('exitFullScreen')"
        >
            <i class="fa-solid fa-compress"></i>
        </div>
    </div>
</template>

<script>
import Select from "./ProblemRightSettingSelect";

export default {
    name: "ProblemSetting",
    props: {
        editorSetting: Object,
        fullScreen: Boolean,
        languageList: Array,
    },
    data() {
        return {
            loading: false,
            defaultLanguages: [
                "html",
                "css",
                "typescript",
                "javascript",
                "java",
                "python",
                "c",
                "c++",
                "c#",
                "ruby",
                "php",
                "golang",
                "swift",
                "scala",
                "kotlin",
                "objective-c",
                "go",
                "rust",
                "lua",
                "perl",
                "mysql",
                "sql",
            ],
        };
    },
    components: {
        Select,
    },
    methods: {
        languageChanged(language) {
            this.editorSetting.language = language;
        },
    },
};
</script>

<style lang="scss" scoped>
.problem-setting {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: var(--normal-font-size);
    .choose-language {
        margin-right: auto;
        margin-left: 4px;
    }
}
.problem-setting > * {
    margin: 0 10px;
}
.problem-setting:hover {
    cursor: pointer;
}
</style>