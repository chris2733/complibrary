<template>
    <div class="topbar">
        <p class="topbar-title">Component library</p>
		<router-link to="/buttons">Buttons</router-link>
		<router-link to="/components">Components</router-link>
    </div>
</template>

<script>
export default {
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.topbar {
	display: flex;
	font-size: 16px;
	align-items: center;
	padding: 0 20px;
	&-title {
		flex-grow: 1;
		margin: 0;
		color: #fff;
	}
	> a {
		color: #fff;
		text-decoration: none;
		padding: 10px;
		background: transparent;
		transition: all 0.3s ease;
		&:hover,
		&:focus {
			background: #383838;
		}
	}
}
</style>
