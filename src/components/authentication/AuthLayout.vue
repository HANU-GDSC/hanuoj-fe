<template>
    <div class="auth-container">
        <div class="content-box">
            <slot name="layoutcontent"></slot>
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
.auth-container {
    @apply flex justify-between w-screen h-screen;
}
    .content-box {
        @apply h-full p-5 w-1/2;
        background-color: var(--container-color);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
    .content-box {
        width: 100%;
    }
    .img {
        display: none;
    }
}
</style>
