<template>
    <div class="problem-setting">
        <div class="choose-language">
            <Select
                class="select"
                :selectList="languageList ? languageList : defaultLanguages"
                :selected="$store.state.general.editorSettings.language"
                @dataUpdated="languageChanged"
            />
        </div>
        <div
            class="retrieve-to-last-submission"
            :title="
                translate({
                    en: 'retrieve to the last submission',
                    vi: 'trở lại lần submit gần nhất',
                })
            "
        >
            <i class="fa-solid fa-right-from-bracket"></i>
        </div>
        <div
            v-if="$store.state.general.theme === 'light-theme'"
            @click="$store.dispatch('general/setTheme', 'dark-theme')"
            class="switch-theme-dark"
            :title="
                translate({
                    en: 'switch theme to dark',
                    vi: 'chuyển giao diện tối',
                })
            "
        >
            <i class="fa-solid fa-circle-half-stroke"></i>
        </div>
        <div
            v-if="$store.state.general.theme === 'dark-theme'"
            @click="$store.dispatch('general/setTheme', 'light-theme')"
            class="switch-theme-light"
            :title="
                translate({
                    en: 'switch theme to light',
                    vi: 'chuyển giao diện sáng',
                })
            "
        >
            <i class="fa-solid fa-circle-half-stroke"></i>
        </div>
        <div
            class="open-setting"
            :title="
                translate({
                    en: 'open setting',
                    vi: 'mở cài đặt',
                })
            "
            @click="showModal = true"
        >
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div
            class="enter-full-screen"
            :title="
                translate({
                    en: 'enter full screen',
                    vi: 'toàn màn hình',
                })
            "
            v-if="!fullScreen"
            @click="$emit('enterFullScreen')"
        >
            <i class="fa-solid fa-expand"></i>
        </div>
        <div
            class="exit-full-screen"
            :title="
                translate({
                    en: 'exit full screen',
                    vi: 'thoát toàn màn hình',
                })
            "
            v-if="fullScreen"
            @click="$emit('exitFullScreen')"
        >
            <i class="fa-solid fa-compress"></i>
        </div>
        <ModalBox
            :isShow="showModal"
            modalWidth="400px"
            @closeModal="showModal = false"
        >
            <EditorSetting />
        </ModalBox>
    </div>
</template>

<script>
import Select from "./ProblemRightSettingSelect";
import EditorSetting from "./ProblemRightSettingEditor";
import ModalBox from "../../general/ModalBox";
import translate from "../../../helpers/translate";

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
            showModal: false,
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
            ],
        };
    },
    components: {
        Select,
        EditorSetting,
        ModalBox,
    },
    methods: {
        languageChanged(language) {
            this.$store.dispatch("general/setEditorSettings", {
                language,
            });
        },
        translate(input) {
            return translate(input);
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
        padding: 0;
        .select {
            border-top-left-radius: 5px;
            width: 120px;
            height: 31px;
        }
    }
}
.problem-setting > * {
    padding: 0 10px;
}
.problem-setting:hover {
    cursor: pointer;
}
</style>