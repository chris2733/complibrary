<template>
    <section>
		<TopNav></TopNav>
		<buttons-page></buttons-page>
	</section>
</template>

<script>
import TopNav from "./components/TopNav.vue";

export default {
    name: "App",
    components: {
        TopNav,
    },
};
</script>

<style lang="scss">
</style>
