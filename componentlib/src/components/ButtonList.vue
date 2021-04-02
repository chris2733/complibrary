<template>
	<section class="buttonsList" :style="cssVars">
		<div class="container-fluid p-0">
			<div class="row no-gutters">
				<button1 :button-data="buttonData" :css-styles="setupButtonCSSVars"></button1>
				<button2 :button-data="buttonData" :css-styles="setupButtonCSSVars"></button2>
			</div>
		</div>
	</section>
</template>

<script>
import button1 from "./buttons/Button1.vue";
import button2 from "./buttons/Button2.vue";

export default {
	props: ["buttonData"],
	provide() {
		return {
			buttonData: this.buttonData,
			allButtonStyle: this.allButtonStyle,
			setupButtonStyleVars: this.setupButtonCSSVars
		}
	},
	components: {
		button1: button1,
		button2: button2,
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
		setupButtonCSSVars() {
			return {
				"--text-col": this.buttonData.textColour,
				"--text-hover-col": this.buttonData.textHoverColour,
				"--primary-col": this.buttonData.primaryColour,
				"--secondary-col": this.buttonData.secondaryColour,
				"--transition":
					"all " +
					this.buttonData.transition +
					"ms cubic-bezier(" +
					this.buttonData.bezier +
					")",
				"--bezier": this.buttonData.bezier,
				"--padding": this.allButtonStyle.padding,
			}
		}
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
