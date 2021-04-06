<template>
    <div class="buttonWrap text-center" ref="buttonwrap" :data-button-key="buttonKey">
        <h3 class="buttonWrap-title">{{ buttonData.name }}</h3>
        <div class="buttonWrap-html" v-html="buttonData.html"></div>
        <buttons-data-bar :buttonData="dataToCopy"></buttons-data-bar>
    </div>
</template>

<script>
import buttonsDataBar from "./ButtonDataBar.vue";
export default {
	props: ['buttonData','buttonKey'],
    components: {
		"buttons-data-bar": buttonsDataBar,
	},
	data() {
        return {

        }
    },
	computed: {
        dataToCopy() {
            // if css hover property exists, add tab (4 spaces) to start of each line, for proper formatting
            let newCss;
            if (this.buttonData.cssHover.length > 0) {
                let currentCss = this.buttonData.cssHover.split(/\r?\n/);
                // set new css, split by line breaks, into new str - with whitespace trimmed from end and tab added to start of each line
                newCss = currentCss.map(element => '        ' + element + '\n').join('').replace(/\s*$/,"");
            }
            // format css properly here
            const data = {
                html: this.buttonData.html,
                css: `{
${this.buttonData.css}
    &:hover,
    &:focus {
${newCss}
    }
}`
            };
            return data;
        }
    },
	methods: {
        setStyleTag() {
            let style = document.createElement("style");
            style.innerHTML = `.buttonsList .buttonWrap[data-button-key="${this.buttonKey}"] .buttonWrap-html > button {${this.buttonData.css}}
            .buttonsList .buttonWrap[data-button-key="${this.buttonKey}"] .buttonWrap-html > button:hover,button:focus {${this.buttonData.cssHover}}`;
            this.$refs.buttonwrap.appendChild(style);   
        },
    },
	mounted() {
        this.setStyleTag();
    },
};
</script>

<style lang="scss" scoped>
.buttonWrap {
	position: relative;
	padding: 50px 0 0 0;
	border: 1px solid rgba(0, 0, 0, 0.1);
	z-index: 1;
	&-title {
		color: var(--text-col);
		margin: 0 0 30px 0;
	}
}
</style>
