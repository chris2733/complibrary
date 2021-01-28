<template>
	<section class="buttonsList" :style="cssVars">
		<div class="container-fluid p-0">
			<div class="row no-gutters">
				<button1
					:button-data="buttonData"
					:all-button-style="allButtonStyle"
				></button1>
			</div>
		</div>
	</section>
</template>

<script>
import button1 from "./buttons/Button1.vue";

export default {
	props: ["buttonData"],
	components: {
		button1: button1,
	},
	data() {
		return {
			allButtonStyle: {
				padding: "25px 50px",
			},
		};
	},
	computed: {
		cssVars() {
			return {
				"--text-col": '#232323',
				"--background": '#ffffff',
			};
		},
	},
	mounted() {},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.buttonsList {
	background: var(--background);
	color: var(--text-col);
}
.buttonWrap {
	position: relative;
	text-align: center;
	padding: 50px 0 0 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 1;
	&-title {
		color: var(--text-col);
		margin: 0 0 30px 0;
	}
}
</style>
