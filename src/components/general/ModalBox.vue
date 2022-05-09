<template>
    <div class="modal-box">
        <div class="modal-content" :style="'width: ' + modalWidth + ';'">
            <div class="modal-body">
                <i class="fas fa-times" @click="closeModal" :title="translate('close')"></i>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import translate from "../../helpers/translate";

export default {
    name: "ModalBox",
    data() {
        return {};
    },
    props: {
        isShow: Boolean,
        modalWidth: String,
    },
    methods: {
        closeModal: function () {
            this.$emit("closeModal");
        },
        translate(input) {
            return translate(input)
        }
    },
    mounted() {
        this.$el.getElementsByClassName("modal-body")[0].addEventListener(("click"), (e) => {
            e.stopPropagation();
        })
        this.$el.addEventListener("click", (e) => {
            this.$emit("closeModal");
        })
    },
    watch: {
        isShow() {
            const modal = this.$el;
            if (this.isShow) modal.style.display = "block";
            else modal.style.display = "none";
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-box {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 2;
    margin: 0 !important;
    padding: 0 !important;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: auto;
    i {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
    }
    i:hover {
        cursor: pointer;
    }
}
.modal-content {
    display: block;
    position: relative;
    width: fit-content;
    height: fit-content;
    border-radius: 5px;
    margin: 50px auto auto;
    border: 1px solid var(--line-color);
    background: var(--container-color);
    border-radius: 5px;
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.2s;
    animation-name: animate;
    animation-duration: 0.2s;
}
@-webkit-keyframes animate {
    from {
        top: -300px;
        opacity: 0;
    }
    to {
        top: 0;
        opacity: 1;
    }
}
@keyframes animate {
    from {
        top: -300px;
        opacity: 0;
    }
    to {
        top: 0;
        opacity: 1;
    }
}
.modal-body {
    margin-top: 10px;
    width: 100%;
    height: fit-content;
}
</style>    