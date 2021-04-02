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
			buttonName: "Fade 2",
		};
	},
	computed: {
		buttonTextCheck() {
			return this.buttonData.text ? this.buttonData.text : "Placeholder";
		},
		buttonHTML() {
			return `<button>
    <span>${this.buttonTextCheck}</span>
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

<style lang="scss">
button {
	position: relative;
	overflow: hidden;
	display: inline-block;
	outline: none;
	padding: var(--padding);
	cursor: pointer;
	color: var(--text-col);
	font-weight: 300;
	letter-spacing: 0px;
	background: var(--primary-col);
	border-radius: 0px;
	span {
		position: absolute;
		top: 0;
		left: 0;
		padding: inherit;
		font-family: inherit;
		transition: var(--transition);
		&:nth-of-type(1) {
			background: var(--primary-col);
			color: var(--text-col);
		}
		&:nth-of-type(2) {
			background: none;
			color: var(--text-hover-col);
			transform: rotate(30deg);
			opacity: 0;
			transform-origin: -50% 0;
		}
	}
	&:hover {
		span {
			&:nth-of-type(1) {
				color: var(--secondary-col);
				background: var(--secondary-col);
			}
			&:nth-of-type(2) {
				transform: rotate(0);
				opacity: 1;
			}
		}
	}
}
</style>
