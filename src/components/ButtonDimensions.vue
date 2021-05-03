<template>
    <div class="buttondimensions container" :style="cssVars">
        <div class="row">
            <div class="mb-3 col-md-4">
                <div class="mb-1">Border radius</div>
                <div class="buttondimensions-rangeslider">
                    <input
						type="range"
						min="0"
						max="70"
						v-model="dimensions.borderRadius"
						step="1"
						@change="emitDimensions"
					/>
					<span>{{ dimensions.borderRadius }}</span>
                </div>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">Padding X</div>
                <div class="buttondimensions-rangeslider">
                    <input
						type="range"
						min="0"
						max="70"
						v-model="dimensions.paddingX"
						step="1"
						@input="emitDimensions"
					/>
					<span>{{ dimensions.paddingX }}px</span>
                </div>
            </div>
            <div class="mb-3 col-md-4">
                <div class="mb-1">Padding Y</div>
                <div class="buttondimensions-rangeslider">
                    <input
						type="range"
						min="0"
						max="50"
						v-model="dimensions.paddingY"
						step="1"
						@input="emitDimensions"
					/>
					<span>{{ dimensions.paddingY }}px</span>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
	props: ["buttonData"],
    emits: {
		"pass-dimensions-values": function(vals) {
			if (vals) {
				return true;
			} else {
				console.log("no text dimension vals passed");
				return false;
			}
		},
	},
	data() {
		return {
            dimensions: {
                borderRadius: this.buttonData.borderRadius,
                paddingY: this.buttonData.paddingY,
                paddingX: this.buttonData.paddingX
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
        emitDimensions() {
            this.$emit("pass-dimensions-values", this.dimensions);
        }
	},
};
</script>

<style lang="scss" scoped>
.buttondimensions {
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
