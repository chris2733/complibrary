<template>
	<div class="textstyler container" :style="cssVars">
        <div class="row">
            <div class="mb-3 col-md-4">
                <div class="mb-1">Font weight</div>
                <div class="textstyler-rangeslider">
                    <input
						type="range"
						min="300"
						max="900"
						v-model="textStyles.fontWeight"
						step="100"
						@input="updateText"
					/>
					<span>{{ textStyles.fontWeight }}</span>
                </div>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">Font size</div>
                <div class="textstyler-rangeslider">
                    <input
						type="range"
						min="14"
						max="30"
						v-model="textStyles.fontSize"
						step="1"
						@input="updateText"
					/>
					<span>{{ textStyles.fontSize }}</span>
                </div>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">letter spacing (px)</div>
                <div class="textstyler-rangeslider">
                </div>
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
            },
            colours: {
				speedSliderBackground: "#fff",
				speedSliderThumb: "#2c3e50",
				speedSliderThumbHover: "#ef233c",
			}
        };
	},
    computed: {
        cssVars() {
			return {
				'--speedslide-back': this.colours.speedSliderBackground,
				'--speedslide-thumb': this.colours.speedSliderThumb,
				'--speedslide-thumbhover': this.colours.speedSliderThumbHover,
			};
		},
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
    &-rangeslider {
        // Range Slider
        $range-handle-color: var(--speedslide-thumb) !default;
        $range-handle-color-hover: var(--speedslide-thumbhover) !default;
        $range-handle-size: 20px !default;

        $range-track-color: var(--speedslide-back) !default;
        $range-track-height: 10px !default;

        input {
            -webkit-appearance: none;
            width: calc(100% - 100px);
            height: $range-track-height;
            border-radius: 5px;
            background: $range-track-color;
            outline: none;
            padding: 0;
            margin: 0;

            // Range Handle
            &::-webkit-slider-thumb {
                appearance: none;
                width: $range-handle-size;
                height: $range-handle-size;
                border-radius: 50%;
                background: $range-handle-color;
                cursor: pointer;
                transition: background .15s ease-in-out;

                &:hover {
                background: $range-handle-color-hover;
                }
            }

            &:active::-webkit-slider-thumb {
                background: $range-handle-color-hover;
            }

            &::-moz-range-thumb {
                width: $range-handle-size;
                height: $range-handle-size;
                border: 0;
                border-radius: 50%;
                background: $range-handle-color;
                cursor: pointer;
                transition: background .15s ease-in-out;

                &:hover {
                background: $range-handle-color-hover;
                }
            }

            &:active::-moz-range-thumb {
                background: $range-handle-color-hover;
            }
        }
        span {
            margin: 0 0 0 10px;
        }
    }
}
</style>
