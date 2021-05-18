<template>
	<div class="topbar" ref="topBar">
		<button class="topbar-buttons" @click="menuItemClick('topbar-fontswitcher')">Font Switcher</button>
        <button class="topbar-buttons" @click="menuItemClick('topbar-plugins')">Plugins</button>
        <button class="topbar-buttons" @click="menuItemClick('topbar-snippets')">Snippets</button>
    </div>
</template>

<script>
export default {
	name: "topbar",
	methods: {
		menuItemClick(key) {
			event.stopPropagation();
			this.$emit("update-current-category", key);
		},
	},
	mounted() {
		this.$emit("topbar-height", this.$refs.topBar.clientHeight);
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.topbar {
	display: flex;
	font-size: 16px;
	align-items: center;
	justify-content: flex-end;
	padding: 0 20px;
	background: #404040;
	&-buttons {
		color: #fff;
		text-decoration: none;
		padding: 10px;
		background: transparent;
		transition: all 0.3s ease;
		outline: none;
		border: none;
		&:hover,
		&:focus {
			background: #383838;
		}
	}
}
</style>
