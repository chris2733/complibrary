<template>
    <section>
        <p>Buttons list</p>
        <div class="container-fluid">
            <div class="row">
                <button1></button1>
            </div>
        </div>
    </section>
</template>

<script>

import button1 from "./buttons/Button1.vue";
export default {
    components: {
        button1,
    },
    data() {
        return {
        };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
