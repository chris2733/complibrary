<template>
	<div class="buttonBar">
		<button>Zeplin</button>
		<button>HTML</button>
		<button>CSS</button>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
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
			border-radius: 7px;
            transform: translate(-50%,0);
            transition: all 0.3s cubic-bezier(0.85, 0, 0.15, 1);
            z-index: -1;
		}
		&:hover,
		&:focus {
			color: #0096c7;
		}
	}
}
</style>
