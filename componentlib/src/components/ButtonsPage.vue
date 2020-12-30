<template>
    <div class="buttonshead">
        <div class="buttonshead-panels" v-if="showPanel">
            <div class="buttonshead-panels-panel"></div>
            <div class="buttonshead-panels-panel"></div>
            <div class="buttonshead-panels-panel"></div>
        </div>
        <div class="buttonshead-main">
            <p>Buttons Page</p>
            <div class="buttonshead-tabs">
                <div class="buttonshead-tabs-each">
                    <img src="../assets/paintimg.png" alt="">
                </div>
                <div class="buttonshead-tabs-each">
                    <img src="../assets/bounceimg.png" alt="">
                </div>
                <div class="buttonshead-tabs-each">
                    <img src="../assets/textimg.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPanel: true,
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buttonshead {
    color: #fff;
    &-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-tabs {
        &-each {
            display: inline-block
            img {
                height: 20px;
            }
        }
    }
}
</style>
