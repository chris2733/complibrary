<template>
	<section class="buttonsList" :style="cssVars">
		<div class="container-fluid p-0">
			<div class="row no-gutters">
				<div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(button, name, index) in buttonList" :key="button">
					<buttonTemplate :button-data="button" :button-key="index"></buttonTemplate>
				</div>
			</div>
		</div>
	</section>
</template>

<script>

function buttonListFunction(data) {
	// use css properties as follows preceeded by 'data':
	const text = data.text;
	const textCol = data.textColour;
	const textHoverCol = data.textHoverColour;
	const primaryCol = data.primaryColour;
	const secondaryCol = data.secondaryColour;
	const bezier = data.bezier;
	const transitionSpeed = data.transition;
	const transitionProperty = `all ${transitionSpeed}ms cubic-bezier(${bezier})`;
	const padding = data.padding;
	const buttonList = {
		button1: {
			name: 'Fade 1',
			html: `<button>
	<span>${text}</span>
</button>`,
			css: `display: inline-block;
background: ${primaryCol};
outline: none;
padding: ${padding};
cursor: pointer;
font-weight: 300;
letter-spacing: 0px;
transition: ${transitionProperty};
color: ${textCol};
border-radius: 0px;`,
			cssHover: `background: ${secondaryCol};
color: ${textHoverCol};
span {
	color: red;
}`
		},
		button2: {
			name: 'Fade 2',
			html: ``,
			css: ``,
			cssHover: ``,
		},
		// use this as a template, ONLY COPY OUT leave here for reference
		// buttonNameHere: {
		// 	name: '',
		// 	html: ``,
		// 	css: ``,
		// cssHover: ``,
		// },
	}
	return buttonList;
}

import buttonTemplate from "./buttonTemplate.vue";
export default {
	props: ["buttonData"],
	components: {
		buttonTemplate,
	},
	data() {
		return {
		}
	},
	computed: {
		buttonList() {
			return buttonListFunction(this.buttonData);
		},
		cssVars() {
			return {
				'--text-col': '#232323',
				'--background': '#ffffff',
			};
		},
	},
	mounted() {},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.buttonsList {
	background: var(--background);
	color: var(--text-col);
}
</style>
