<template>
    <div class="test-case">
        <div
            class="test"
            v-for="(sample, index) in sampleTestCases"
            :key="index"
        >
            <p>
                {{
                    sampleTestCases.length != 1
                        ? `${translate({ en: "case", vi: "đầu vào" })} ${
                              index + 1
                          }: `
                        : ""
                }}
            </p>
            <div class="container">
                <Console :text="sample.input" />
                <Console :text="sample.expectedOutput" />
            </div>
        </div>
    </div>
</template>

<script>
import Console from "../../general/Console";
import translate from "../../../helpers/translate";

export default {
    name: "TestCase",
    props: {
        testCases: {
            type: Array,
            default: [],
        },
    },
    methods: {
        translate(input) {
            return translate(input);
        },
    },
    computed: {
        sampleTestCases() {
            this.testCases.sort((a, b) => a.ordinal - b.ordinal);
            // return this.testCases;
            return this.testCases.filter((testCase) => testCase.isSample);
        },
    },
    components: {
        Console,
    },
};
</script>

<style lang="scss" scoped>
.test-case {
    padding: 5px;
    .test {
        margin-bottom: 5px;
        .container {
            display: flex;
            justify-content: space-between;
        }
        .container > * {
            flex: 0 0 calc(50% - 5px);
        }
    }
}
</style>