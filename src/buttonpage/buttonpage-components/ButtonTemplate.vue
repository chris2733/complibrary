<template>
    <div class="buttonWrap text-center" ref="buttonwrap" :data-button-key="buttonKey">
        <h3 class="buttonWrap-title">{{ buttonData.name }}</h3>
        <div class="buttonWrap-html" v-html="buttonData.html"></div>
        <buttons-data-bar :buttonData="dataToCopy"></buttons-data-bar>
    </div>
</template>

<script>

// using stylis temporarily, before styled components works with vue 3
import {compile, middleware, stringify, serialize} from 'stylis';
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
            const data = {
                html: this.buttonData.html,
                css: this.buttonData.css
            };
            return data;
        }
    },
	methods: {
        setStyleTag() {
            let style = document.createElement("style");
            const styleValue = serialize(compile(`.buttonsList .buttonWrap[data-button-key="${this.buttonKey}"] .buttonWrap-html > button{${this.buttonData.css}}`), middleware([stringify]));
            style.innerHTML = `${styleValue}`;
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
