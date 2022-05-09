<template>
    <div class="test-case">
        <Console :text="testCase" />
    </div>
</template>

<script>
import Console from "../../general/Console";

export default {
    name: "TestCase",
    props: {
        testCase: String,   
    },
    components: {
        Console,
    },
};
</script>

<style lang="scss" scoped>
.test-case {
}
</style>