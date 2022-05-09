<template>
    <i class="fa-solid fa-gear"></i>
</template>

<script>
export default {
    name: "LoadingIcon",
};
</script>

<style lang="scss" scoped>
i {
    animation: spin 2000ms infinite linear;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>