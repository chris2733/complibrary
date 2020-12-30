<template>
	<div class="container-fluid">
		<TopNav></TopNav>
		<buttons-page></buttons-page>
	</div>
</template>

<script>
import TopNav from './components/TopNav.vue'

export default {
	name: "App",
	components: {
		TopNav
	}
};
</script>

<style lang="scss">

</style>
