<template>
    <div class="console-submission">
        {{ submissionIsEmpty }}
        {{ submission }}
        {{ submission }}
        {{ submission }}
        {{ submission }}
        {{ submission }}
    </div>
</template>

<script>
export default {
    name: "Submission",
    props: {
        submission: {
            type: Object,
            default: {},
        },
    },
    computed: {
        submissionIsEmpty() {
            return (
                Object.keys(this.submission).length === 0 &&
                this.submission.constructor === Object
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.console-submission {
    padding: 5px;
}
</style>