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
    @apply h-full p-5 w-1/2 bg-white shadow-2xl;
}
.img {
    @apply flex justify-center items-center w-3/5 h-full p-3 overflow-hidden;
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
