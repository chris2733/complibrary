<template>
	<div class="textstyler container">
        <div class="row">
            <div class="mb-3 col-12">
                <div class="mb-1">Font picker</div>
                <div class="d-flex">
                    <input type="text" class="flex-grow-1 px-3">
                    <button class="p-3 textstyler-applybutton">Apply font</button>
                </div>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">Font weight</div>
                <select name="" id="" class="w-100 p-3">
                    <option value="n" v-for="n in Array.from({length: 5}, (x, i) => i + 3)" :key="n">{{ n }}00</option>
                </select>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">Font size</div>
                <select name="" id="" class="w-100 p-3">
                    <option value="n" v-for="n in Array.from({length: 17}, (x, i) => i + 14)" :key="n">{{ n }}</option>
                </select>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">letter spacing (px)</div>
                <input type="text" pattern="^\d*" maxlength="1" class="w-100 p-3" v-model="textStyles.letterSpacing" @change="updateText">
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
                letterSpacing: this.buttonData.letterSpacing
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
