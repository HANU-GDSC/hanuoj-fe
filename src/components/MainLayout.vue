<template>
    <div class="layout">
        <div class="main-content">
            <slot name="left"></slot>
        </div>
        <div class="side-bar">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "MainLayout"
}
</script>

<style lang="scss" scoped>
.layout {
    position: relative;
    display: flex;
    .main-content {
        border: 1px solid blue;
        flex: 0 0 70%;
    }
    .side-bar {
        flex: 0 0 30%;
        height: 100vh;
        position: sticky;
        top: 0;
        overflow-y: hidden;
        border: 1px solid blue;
    }
}
</style>