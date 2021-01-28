<template>
	<div class="buttonBar">
		<button @click="copyText($event, buttonHTML)">HTML</button>
		<button @click="copyText($event, buttonCSS)">CSS</button>
		<button @click="copyText($event, buttonHTML + '\n' + buttonCSS)">Both</button>
		<textarea
			value="testarea"
			ref="textCopy"
			class="buttonBar-hiddentext"
		></textarea>
	</div>
</template>

<script>
export default {
	props: ["buttonHTML", "buttonCSS"],
	data() {
		return {};
	},
	methods: {
		copyText($event, text) {
			this.$refs.textCopy.value = text;
			this.$refs.textCopy.select();
			document.execCommand("copy");
			this.$refs.textCopy.blur();
            $event.target.classList.add("__active");
            setTimeout(function() {
                $event.target.classList.remove("__active");
            }, 500);
		},
	},
};
</script>

<style lang="scss">
.buttonBar {
	position: relative;
	bottom: 0;
	width: 100%;
	left: 0;
	display: flex;
	justify-content: space-around;
	padding: 15px 25px;
	background: #f1f1f1;
	margin: 50px 0 0 0;
	button {
		position: relative;
		color: #232323;
		font-weight: 400;
		font-size: 15px;
		transition: all 0.3s ease;
		&::before {
			content: "Copied!";
			position: absolute;
			top: -15px;
			left: 50%;
			background: #0096c7;
			color: #fff;
			padding: 7px;
			border-top-left-radius: 7px;
            border-top-right-radius: 7px;
			transform: translate(-50%, 0);
			transition: all 0.2s cubic-bezier(0.13, 0.61, 0.21, 0.91);
			z-index: -1;
		}
		&:hover,
		&:focus {
			color: #0096c7;
		}
		&.__active {
			&::before {
				transform: translate(-50%, -100%);
			}
		}
	}
	&-hiddentext {
		position: absolute;
		left: -9999999px;
	}
}
</style>
