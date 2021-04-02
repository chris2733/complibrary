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
    data() {
        return {
        }
    },
    methods: {
    }
};
</script>

<style lang="scss">
.whitetext {
    color: #fff;
}
</style>
