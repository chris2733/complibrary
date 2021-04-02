<template>
	<div class="col-12 col-sm-6 col-md-4 col-lg-3">
		<div class="buttonWrap">
			<h3 class="buttonWrap-title">{{ buttonName }}</h3>
			<div class="button" v-html="buttonHTML" :style="cssVars"></div>
			<buttons-data-bar
				:buttonHTML="buttonHTML"
				:buttonCSS="buttonCSS"
			></buttons-data-bar>
		</div>
	</div>
</template>

<script>
import buttonsDataBar from "../ButtonDataBar.vue";
export default {
	props: ['buttonData','cssStyles'],
	components: {
		"buttons-data-bar": buttonsDataBar,
	},
	data() {
		return {
			buttonName: "Fade 1",
		};
	},
	computed: {
		buttonTextCheck() {
			return this.buttonData.text ? this.buttonData.text : "Placeholder";
		},
		buttonHTML() {
			return `<button>
    <span>${this.buttonTextCheck}</span>
</button>`;
		},
		buttonCSS() {
			return `display: inline-block;
background: ${this.cssVars["--text-col"]};
outline: none;
padding: ${this.cssVars["--padding"]};
cursor: pointer;
font-weight: 300;
letter-spacing: 0px;
transition: ${this.cssVars["--transition"]};
color: ${this.cssVars["--text-col"]};
border-radius: 0px;
&:hover {
    background: ${this.cssVars["--secondary-col"]};
    color: ${this.cssVars["--text-hover-col"]};
}`;
		},
		cssVars() {
			return this.cssStyles;
		},
	},
	methods: {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
button {
	display: inline-block;
	background: var(--primary-col);
	outline: none;
	padding: var(--padding);
	cursor: pointer;
	font-weight: 300;
	letter-spacing: 0px;
	transition: var(--transition);
	color: var(--text-col);
	border-radius: 0px;
	&:hover {
		background: var(--secondary-col);
		color: var(--text-hover-col);
	}
}
</style>
