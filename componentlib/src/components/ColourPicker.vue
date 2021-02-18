<template>
	<section class="colourpicker" :style="cssVars">
		<div class="colourpicker-demo"></div>
		<div
			class="colourpicker-swatch swatchPickerWrap"
			:style="currentSwatch"
			@mousedown="swatchActive"
			@mousemove="moveColourSwatch"
			@mouseleave="leaveSwatch"
			@mouseup="leaveSwatch"
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
			<input
				type="text"
				placeholder="HEX CODE"
				maxlength="6"
				@focusout="checkCustomHex($event.target.value)"
				:class="{ error: customHexError }"
			/>
		</div>
	</section>
</template>

<script>
export default {
    props: ['setInitialColour'],
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
			currentColourValues: [239, 54, 81, 255], // ??? duno if this needs fixing?
			currentColour: this.setInitialColour, 
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
        this.convertCustomHEXtoHSV(this.setInitialColour);
	},
	methods: {
		setSwatchWidth() {
			const swatchEl = document.querySelector(".swatchPickerWrap");
			if (swatchEl) {
				this.swatchWidth = document.querySelector(
					".swatchPickerWrap"
				).offsetWidth;
				this.swatchHeight = document.querySelector(
					".swatchPickerWrap"
				).offsetHeight;
			}
		},
		opacityChange() {
			this.currentColourValues[3] = Number(event.target.value);
			this.setColourValues();
		},
		hueChange() {
			this.currentColourValues[0] = event.target.value;
			this.setColourValues();
		},
		setColourValues() {
			const rgbval = this.HSVtoRGB(
				this.currentColourValues[0],
				this.currentColourValues[1],
				this.currentColourValues[2]
			);
			this.RGBAtoAHEX(rgbval);
			this.$emit("pass-colour-values", this.currentColour);
		},
		RGBAtoAHEX(rgbval) {
			let hexval = "";
			rgbval.forEach((rgbval) => {
				let hex = rgbval.toString(16);
				hexval =
					hexval + (hex.length == 1 ? "0" + hex : hex).toString();
			});
			// add opacity here, after hsv to rgb calc
			hexval += this.currentColourValues[3].toString(16);
			this.currentColour = "#" + hexval;
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
				this.setColourValues();
			}
		},
		setSwatchPickerPos(x, y) {
			this.swatchPosition.x = x + "%";
			this.swatchPosition.y = y + "%";
		},
		setSwatchPickerPosInitially() {
			this.swatchPosition.x = this.currentColourValues[1] + "%";
			this.swatchPosition.y = this.currentColourValues[2] + "%";
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
		checkCustomHex(hexcode) {
			let regex = /^(?:[0-9a-fA-F]{3}){1,2}$/g;
			let regtest = regex.test(hexcode);
			if (hexcode.length == 0) {
				this.customHexError = false;
			} else if (regtest !== true) {
				this.customHexError = true;
			} else {
				this.customHexError = false;
				this.convertCustomHEXtoHSV(hexcode);
			}
		},
        convertCustomHEXtoHSV(newhexvalue) {
            let newHEX;
            if (newhexvalue.includes('#')) {
                newHEX = newhexvalue;
            } else {
                newHEX = '#' + newhexvalue;
            }
            let newRGB = this.HEXtoRGB(newHEX);
			// console.log(newRGB);
            let newHSV = this.RGBtoHSV(newRGB.r,newRGB.g,newRGB.b);
            this.currentColourValues[0] = newHSV.h;
            this.currentColourValues[1] = newHSV.s;
            this.currentColourValues[2] = newHSV.v;
            this.currentColourValues[3] = Number('255');
            this.setSwatchPickerPos(newHSV.s,newHSV.v);
            this.setColourValues();
        },
		HEXtoRGB(hex) {
			// check if hex has '#' in front and remove
			hex = hex.replace('#', '');

			// trim down alpha hex to work with equation
			if (hex.length > 6) {
				hex = hex.slice(0,6);
			}

            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
		RGBtoHSV(r,g,b) {
			let rabs,
				gabs,
				babs,
				rr,
				gg,
				bb,
				h,
				s,
				v,
				diff,
				diffc,
				percentRoundFn;
			rabs = r / 255;
			gabs = g / 255;
			babs = b / 255;
			(v = Math.max(rabs, gabs, babs)),
				(diff = v - Math.min(rabs, gabs, babs));
			diffc = (c) => (v - c) / 6 / diff + 1 / 2;
			percentRoundFn = (num) => Math.round(num * 100) / 100;
			if (diff == 0) {
				h = s = 0;
			} else {
				s = diff / v;
				rr = diffc(rabs);
				gg = diffc(gabs);
				bb = diffc(babs);

				if (rabs === v) {
					h = bb - gg;
				} else if (gabs === v) {
					h = 1 / 3 + rr - bb;
				} else if (babs === v) {
					h = 2 / 3 + gg - rr;
				}
				if (h < 0) {
					h += 1;
				} else if (h > 1) {
					h -= 1;
				}
			}
			return {
				h: Math.round(h * 360),
				s: percentRoundFn(s * 100),
				v: percentRoundFn(v * 100),
			};
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.colourpicker {
	display: inline-block;
	border: 1px solid var(--borders);
	border-radius: 10px;
	padding: 20px;
	width: 250px;
	margin: 0 40px 0 0;
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
			transition: all 0.2s ease;
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
