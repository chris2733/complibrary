<template>
    <div class="buttonWrap">
        <h3>{{ buttonName }}</h3>
            <div class="button" v-html="buttonHTML" :style="cssVars">
        </div>
    </div>
</template>


<script>
export default {
	props: ["buttonData", "allButtonStyle"],
	data() {
		return {
            buttonName: "Fade 1",
			buttonHTML: `<button>
    <span>${this.buttonData.text}</span>
</button>`,
		};
	},
	computed: {
        cssVars() {
            return {
                "--text-col": this.buttonData.textColour,
                "--text-hover-col": this.buttonData.textHoverColour,
				"--primary-col": this.buttonData.primaryColour,
                "--secondary-col": this.buttonData.secondaryColour,
                "--transition": "all " + this.buttonData.transition + "ms cubic-bezier(" + this.buttonData.bezier + ")",
                "--bezier": this.buttonData.bezier,
                "--padding": this.allButtonStyle.padding,
			};
        }
    },
	methods: {},
};
</script>


<style lang="scss">
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
