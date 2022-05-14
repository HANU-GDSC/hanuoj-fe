<template>
    <div class="container">
        <div class="layout-content">
            <div class="layout-content__box">
                <slot name="layoutcontent"></slot>
            </div>
        </div>
        <div class="img">
            <slot name="image"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
}
.layout-content {
    width: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    &__box {
        overflow: auto;
        width: 80%;
        min-width: 300px;
        max-width: 450px;
        max-height: 800px;
        height: 90%;
        border-radius: 20px;
        background-color: var(--container-color);
        padding: 20px;
    }
}
.img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
    padding: 10px;
    overflow: hidden;
}
@media only screen and (max-width: 850px) {
    .layout-content {
        width: 100vw;
    }
    .img {
        display: none;
    }
}
</style>