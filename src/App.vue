<template>
    <section>
		<top-nav></top-nav>
		<router-view></router-view>
	</section>
</template>

<script>
import TopNav from "./root-components/TopNav.vue";

export default {
    name: "App",
    components: {
        TopNav
    },
    data() {
        return {
        }
    },
    methods: {
    }
};
</script>

<style lang="scss">
</style>
