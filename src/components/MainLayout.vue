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
    .main-content {
        display: inline-block;
        vertical-align: top;
        width: 75%;
        border: 1px solid blue;
    }
    .side-bar {
        display: inline-block;
        vertical-align: top;
        width: 25%;
        height: 100vh;
        position: sticky;
        overflow-y: hidden;
        border: 1px solid blue;
    }
}
</style>