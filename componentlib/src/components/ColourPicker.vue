<template>
	<section class="colourpicker" :style="cssVars">
		<div class="colourpicker-demo"></div>
		<div
			class="colourpicker-swatch"
			:style="currentSwatch"
			@mousedown="swatchActive"
			@mousemove="moveColourSwatch"
			@mouseleave="leaveSwatch"
			@mouseup="leaveSwatch"
			id="swatchPickerWrap"
		></div>
		<div class="colourpicker-draggers">
			<div class="colourpicker-draggers-colour">
				<input
					type="range"
					min="0"
					max="360"
					:value="currentColourValues[0]"
					@input="hueChange"
				/>
			</div>
			<div class="colourpicker-draggers-opacity">
				<input
					type="range"
					min="0"
					max="255"
					:value="currentColourValues[3]"
					@input="opacityChange"
				/>
			</div>
		</div>
		<div class="colourpicker-customhex">
			<input type="text" placeholder="HEX CODE" maxlength="6" @focusout="checkCustomHex" :class="{ error: customHexError }"/>
		</div>
	</section>
</template>

<script>
export default {
	emits: {
		"pass-colour-values": function(vals) {
			if (vals) {
				return true;
			} else {
				console.log("no colour vals passed");
				return false;
			}
		},
	},
	data() {
		return {
			// had to use HSV from the user, convert to rgb, then to hex to be consistent
			currentColourValues: [239, 54, 81, 255], //these both need to be set correct initially
			currentColour: "#5e60ce", //these both need to be set correct initially
			swatchWidth: 0,
			swatchHeight: 0,
			swatchPosition: {
				x: "50%",
				y: "50%",
			},
			theme: {
				border: "#fff",
			},
			swatchPickActive: false,
            customHexError: false,
		};
	},
	computed: {
		cssVars() {
			return {
				"--current-colour": this.currentColour,
				"--borders": this.theme.border,
				"--swatchx": this.swatchPosition.x,
				"--swatchy": this.swatchPosition.y,
			};
		},
		currentSwatch() {
			return {
				background:
					"linear-gradient(to bottom, transparent 0%, #000 100%), linear-gradient(to right, #fff 0%, " +
					this.currentColour +
					" 100%)",
			};
		},
		moveSwatchPicker() {
			// console.log(this.swatchPosition.x);
			return {
				// bottom: this.swatchPosition.y,
				left: this.swatchPosition.x,
			};
		},
	},
	mounted() {
		this.setSwatchWidth();
        this.setSwatchPickerPosInitially();
	},
	methods: {
		setSwatchWidth() {
			const swatchEl = document.querySelector("#swatchPickerWrap");
			if (swatchEl) {
				this.swatchWidth = document.querySelector(
					"#swatchPickerWrap"
				).offsetWidth;
				this.swatchHeight = document.querySelector(
					"#swatchPickerWrap"
				).offsetHeight;
			}
		},
		opacityChange() {
			this.currentColourValues[3] = Number(event.target.value);
			this.colourChange();
		},
		hueChange() {
			this.currentColourValues[0] = event.target.value;
			this.colourChange();
		},
		colourChange() {
			const rgbval = this.HSVtoRGB(
                this.currentColourValues[0],
                this.currentColourValues[1],
                this.currentColourValues[2]
            );
            this.RGBAtoAHEX(rgbval);
			this.$emit("pass-colour-values", this.currentColour);
		},
		RGBAtoAHEX(rgbval) {
            let hexval = '';
            rgbval.forEach(rgbval => {
                let hex = rgbval.toString(16);
                hexval = hexval + (hex.length == 1 ? "0" + hex : hex).toString();
            });
            // add opacity here, after hsv to rgb calc
            hexval += this.currentColourValues[3].toString(16);
            this.currentColour = '#' + hexval;
		},
		swatchActive() {
			this.swatchPickActive = true;
		},
		moveColourSwatch(e) {
			if (this.swatchPickActive === true) {
				const offsetX = e.offsetX;
				const offsetY = e.offsetY;
				const pickerX = (offsetX / this.swatchWidth) * 100;
				const pickerY =
					((offsetY / this.swatchHeight) * 100 - 100) * -1;
                this.setSwatchPickerPos(pickerX, pickerY);
				this.currentColourValues[1] = pickerX;
				this.currentColourValues[2] = pickerY;
                this.colourChange();

			}
		},
        setSwatchPickerPos(x, y) {
            this.swatchPosition.x = x + "%";
            this.swatchPosition.y = y + "%";
        },
        setSwatchPickerPosInitially() {
            this.swatchPosition.x = this.currentColourValues[1] + '%';
            this.swatchPosition.y = this.currentColourValues[2] + '%';
        },
		leaveSwatch() {
			this.swatchPickActive = false;
		},
		HSVtoRGB(h, s, v) {
			var r, g, b;
			var i;
			var f, p, q, t;

			// Make sure our arguments stay in-range
			h = Math.max(0, Math.min(360, h));
			s = Math.max(0, Math.min(100, s));
			v = Math.max(0, Math.min(100, v));

			// We accept saturation and value arguments from 0 to 100 because that's
			// how Photoshop represents those values. Internally, however, the
			// saturation and value are calculated from a range of 0 to 1. We make
			// That conversion here.
			s /= 100;
			v /= 100;

			if (s == 0) {
				// Achromatic (grey)
				r = g = b = v;
				return [
					Math.round(r * 255),
					Math.round(g * 255),
					Math.round(b * 255),
				];
			}

			h /= 60; // sector 0 to 5
			i = Math.floor(h);
			f = h - i; // factorial part of h
			p = v * (1 - s);
			q = v * (1 - s * f);
			t = v * (1 - s * (1 - f));

			switch (i) {
				case 0:
					r = v;
					g = t;
					b = p;
					break;

				case 1:
					r = q;
					g = v;
					b = p;
					break;

				case 2:
					r = p;
					g = v;
					b = t;
					break;

				case 3:
					r = p;
					g = q;
					b = v;
					break;

				case 4:
					r = t;
					g = p;
					b = v;
					break;

				default:
					// case 5:
					r = v;
					g = p;
					b = q;
			}

			return [
				Math.round(r * 255),
				Math.round(g * 255),
				Math.round(b * 255),
			];
		},
        checkCustomHex() {
            let regex = /^(?:[0-9a-fA-F]{3}){1,2}$/g;
            let regtest = regex.test(event.target.value);
            if (regtest !== true && event.target.value.length !== 0) {
                this.customHexError = true;
            } else {
                this.customHexError = false;
            }
            console.log(this.customHexError);
        },
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.colourpicker {
	border: 1px solid var(--borders);
	border-radius: 10px;
	padding: 20px;
	width: 250px;
	&-demo {
		height: 100px;
		background: var(--current-colour);
	}
	&-swatch {
		position: relative;
		width: 100%;
		height: 100px;
		margin: 0 0 15px 0;
		background: linear-gradient(to bottom, transparent 0%, #000 100%),
			linear-gradient(to right, #fff 0%, rgb(39, 199, 18) 100%);
		&::before {
			content: "";
			height: 20px;
			width: 20px;
			position: absolute;
			bottom: var(--swatchy);
			left: var(--swatchx);
			z-index: 1;
			border: 3px solid #fff;
			border-radius: 50%;
			transform: translate(-50%, 50%);
		}
	}
	&-draggers {
		width: 100%;
		margin: 0 0 15px 0;
		&-colour input,
		&-opacity input {
			width: 100%;
			-webkit-appearance: none;
			height: 10px;
			border-radius: 5px;
			&::-webkit-slider-thumb,
			&::-moz-range-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 45px;
				height: 45px;
				border: 2px solid #fff;
				cursor: pointer;
			}
		}
		&-colour input {
			background: linear-gradient(
				to right,
				hsl(0, 100%, 50%),
				hsl(60, 100%, 50%),
				hsl(120, 100%, 50%),
				hsl(180, 100%, 50%),
				hsl(240, 100%, 50%),
				hsl(300, 100%, 50%),
				hsl(360, 100%, 50%)
			);
		}
		&-opacity {
			position: relative;
			z-index: 1;
			&::before {
				content: "";
				position: absolute;
				top: 55%;
				left: 0;
				height: 10px;
				width: 100%;
				background-image: linear-gradient(
						45deg,
						#ccc 25%,
						transparent 25%
					),
					linear-gradient(-45deg, #ccc 25%, transparent 25%),
					linear-gradient(45deg, transparent 75%, #ccc 75%),
					linear-gradient(-45deg, transparent 75%, #ccc 75%);
				background-size: 12px 12px;
				background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
				z-index: -1;
				border-radius: 5px;
				transform: translateY(-50%);
			}
			input {
				background: linear-gradient(
					to right,
					transparent 0%,
					#000 100%
				);
			}
		}
	}
	&-customhex {
		input {
			width: 100%;
			background: none;
			outline: none;
			box-shadow: none;
			border: 1px solid var(--borders);
			text-align: center;
			font-size: 12px;
			letter-spacing: 2px;
			color: #fff;
			border-radius: 10px;
			padding: 7px 0;
            transition: all 0.1s ease;
			$placeholdercolour: #fff;
			&::-webkit-input-placeholder {
				/* Chrome/Opera/Safari */
				color: placeholdercolour;
			}
			&::-moz-placeholder {
				/* Firefox 19+ */
				color: placeholdercolour;
			}
			&:-ms-input-placeholder {
				/* IE 10+ */
				color: placeholdercolour;
			}
			&:-moz-placeholder {
				/* Firefox 18- */
				color: placeholdercolour;
			}
            &.error {
                border: 1px solid red;
            }
		}
	}
}
</style>
