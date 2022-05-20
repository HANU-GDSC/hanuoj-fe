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
        padding: 20px;
        border-radius: 20px;
        background-color: var(--container-color);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
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
        width: 100%;
    }
    .img {
        display: none;
    }
}

@media only screen and (max-width: 600px) {
    .layout-content {
        &__box {
            width: 100%;
            height: 100%;
            max-width: unset;
            max-height: unset;
            border-radius: 0;
        }
    }
}
</style>
