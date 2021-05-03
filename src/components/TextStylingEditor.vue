<template>
	<div class="textstyler container">
        <div class="row">
            <div class="mb-3 col-md-4">
                <div class="mb-1">Font weight</div>
                <select name="" id="" class="w-100 p-3" v-model="textStyles.fontWeight" @change="updateText">
                    <option :value="n + '00'" v-for="n in Array.from({length: 7}, (x, i) => i + 3)" :key="n">{{ n }}00</option>
                </select>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">Font size</div>
                <select name="" id="" class="w-100 p-3" v-model="textStyles.fontSize" @change="updateText">
                    <option :value="n" v-for="n in Array.from({length: 17}, (x, i) => i + 14)" :key="n" :selected="n == textStyles.fontSize">{{ n }}</option>
                </select>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">letter spacing (px)</div>
                <input type="text" pattern="^\d*" maxlength="3" class="w-100 p-3" v-model="textStyles.letterSpacing" @change="updateText">
            </div>
        </div>
	</div>
</template>

<script>
export default {
    props: ["buttonData"],
    emits: {
		"pass-styling-values": function(vals) {
			if (vals) {
				return true;
			} else {
				console.log("no text styling vals passed");
				return false;
			}
		},
	},
	data() {
		return {
            textStyles: {
                letterSpacing: this.buttonData.letterSpacing,
                fontWeight: this.buttonData.fontWeight,
                fontSize: this.buttonData.fontSize,
            }
        };
	},
	methods: {
        updateText() {
            this.$emit("pass-styling-values", this.textStyles);
        }
	},
};
</script>

<style lang="scss">
.textstyler {
    &-applybutton {
        background: #ef233c;
        transition: all 0.3s ease;
        color: #fff;
        &:hover,
        &:focus {
            background: #d90429;
        }
    }
}
</style>
