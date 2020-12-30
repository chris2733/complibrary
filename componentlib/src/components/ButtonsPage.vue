<template>
    <div class="buttonshead">
        <section class="buttonshead-panels" v-if="showPanel">
            <div class="buttonshead-panels-panel"></div>
            <div class="buttonshead-panels-panel"></div>
            <div class="buttonshead-panels-panel"></div>
        </section>
        <section class="buttonshead-main">
            <p>Buttons Page</p>
            <div class="buttonshead-tabs">
                <button class="buttonshead-tabs-each">
                    <img src="../assets/paintimg.png" alt="" />
                </button>
                <button class="buttonshead-tabs-each">
                    <img src="../assets/bounceimg.png" alt="" />
                </button>
                <button class="buttonshead-tabs-each">
                    <img src="../assets/textimg.png" alt="" />
                </button>
            </div>
        </section>
        <section class="buttonshead-textfill">
            <p>Button Text</p>
            <input type="text" v-model="buttonFillText">
        </section>
        <buttons-list></buttons-list>
    </div>
</template>

<script>
import buttonsList from "./Buttons.vue";

export default {
    components: {
        'buttons-list': buttonsList
    },
    data() {
        return {
            showPanel: true,
            buttonFillText: 'Button',
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buttonshead {
    color: #fff;
    border-top: 1px solid #fff3;
    &-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 0 20px;
    }
    &-tabs {
        &-each {
            position: relative;
            display: inline-block;
            height: 80px;
            width: 80px;
            transition: all 0.3s ease;
            background: transparent;
            border-left: 1px solid #fff3;
            &:hover,
            &:focus {
                background: #383838;
            }
            img {
                height: 25px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
    &-textfill {
        display: flex;
        p {
            padding: 20px;
            border-top: 1px solid #fff3;
        }
        input {
            flex-grow: 1;
            padding: 0 20px;
        }
    }
}
</style>
