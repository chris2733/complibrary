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
	// const fontWeight = data.fontWeight;
	// const fontSize = `${data.fontSize}px`;
	const letterSpacing = `${data.letterSpacing}px`;
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
letter-spacing: ${letterSpacing};
transition: ${transitionProperty};
color: ${textCol};
span {
	transition: ${transitionProperty};
}
&:hover,
&:focus {
	background: ${secondaryCol};
	color: ${textHoverCol};
	span {
		color: ${textHoverCol};
	}
}`,
		},
		button2: {
			name: 'Fade 2',
			html: `<button>
    ${text}
    <span>${text}</span>
    <span>${text}</span>
</button>`,
			css: `position: relative;
overflow: hidden;
display: inline-block;
outline: none;
padding: ${padding};
cursor: pointer;
color: ${textCol};
letter-spacing: ${letterSpacing};
background: ${primaryCol};
span {
    position: absolute;
    top: 0;
    left: 0;
    padding: inherit;
    font-family: inherit;
    transition: ${transitionProperty};
    &:nth-of-type(1) {
        color: ${textCol};
		background: ${primaryCol}
    }
    &:nth-of-type(2) {
		background: none;
        color: ${textHoverCol};
        transform: rotate(30deg);
        opacity: 0;
        transform-origin: -50% 0;
    }
}
&:hover,
&:focus {
	span {
		&:nth-of-type(1) {
			color: ${textHoverCol};
			background: ${secondaryCol};
		}
		&:nth-of-type(2) {
			color: ${textHoverCol};
			transform: rotate(0);
			opacity: 1;
		}
	}
}`,
		},
		// use this as a template, ONLY COPY OUT leave here for reference
		// buttonNameHere: {
		// 	name: '',
		// 	html: ``,
		// 	css: ``,
		// },
	}
	return buttonList;
}

import buttonTemplate from "./ButtonTemplate.vue";
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
				'--font-size': this.buttonData.fontSize + 'px',
				'--font-weight': this.buttonData.fontWeight,
				'--border-radius': this.buttonData.borderRadius + 'px',
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
	button {
		font-weight: var(--font-weight);
		font-size: var(--font-size);
		border-radius: var(--border-radius);
	}
}
</style>
