<template>
    <div class="btn">
        <button :type="type" :title="des" :class="{btnDisable: disable}">{{ text }}</button>
    </div>
</template>

<script>
export default {
    name: "Button",

    props: {
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "Primary"
        },
        disable: {
            type: Boolean,
            default: false
        },
        des: {
            type: String,
        }
    }
}
</script>

<style>
/* default primary */
button {
    width: 5rem;
    height: 2.5rem;
    background-color: #4387F4;
    border-radius: 10px;
    border: none;
    font-size: .938rem;
    color: #fff;
    font-weight: 500;
} 

/* secondary */
button[type="secondary"] {
    width: 5rem;
    height: 2.5rem; 
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #0E65F1;
    font-size: .938rem;
    color: #0E65F1;
    font-weight: 500;
}

/* disable */
.btnDisable {
    pointer-events: none;
    background-color: #9FC1F9;
    color: #3077E8;
}

/* active */
.btnActive {
    pointer-events: none;
    background-color: #083D91;
    color: #fff;
}

/* hiệu ứng khi hover */
button:hover {
    background-color: #0E65F1;
    color: #fff;
}
/* hiệu ứng khi press */
button:active {
    transition-duration: 0s;
    background-color: #0E65F1;
    border: 2px solid #9FC1F9;
    color: #fff;
}

</style>