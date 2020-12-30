<template>
    <div class="topbar">
        <p class="topbar-title">Component lib</p>
        <a href="#nogo">Buttons</a>
        <a href="#nogo">Components</a>
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
