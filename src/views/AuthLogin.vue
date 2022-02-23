<template>
    Login
    <Button text="Save" des="submit form" :disable="true"/><br>
    <Button text="Yes" type="primary" des="accept"/><br>
    <Button text="No" type="secondary" des="refuse"/>
</template>

<script>
import Button from '../components/general/Button';
export default {
  components: { Button },
    name: "AuthLogin",
};
</script>

<style>
Button {
    margin-left: 50%;
}
</style>