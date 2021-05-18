<template>
	<div class="bezierContainer" :style="cssVars">
		<svg
			:viewBox="setViewbox"
			aria-labelledby="bezierTitle bezierDesc"
			aria-describedby="bezierDesc"
			role="img"
			@mouseleave="resetListener"
			@mouseup="resetListener"
			@mousemove="mouseTrack"
		>
			<title id="bezierTitle">Bezier Generator tool</title>
			<desc id="bezierDesc">
				interactive tool for making a custom bezier curve
			</desc>

			<g class="bezier-chart" ref="mainChart">
				<rect
					:height="chartHeight"
					:width="chartWidth"
					y="0"
					x="0"
					:fill="colours.outerChartFill"
					:stroke="colours.outerChartBorder"
				/>
				<g class="bezier-chart-inner">
					<rect 
						:fill="colours.innerChartFill"
						:stroke="colours.innerChartBorder"
						v-bind="innerChartAttrs" 
						ref="innerChart" />
					<path
						:d="bezierDrawPath"
						:stroke="colours.bezierStroke"
						fill="none"
						stroke-width="2"
					/>
					<line
						x1="0"
						y1="300"
						:x2="point1.x"
						:y2="point1.y"
						:stroke-width="lines.width"
						:stroke="lines.stroke"
					/>
					<circle
						:cx="point1.x"
						:cy="point1.y"
						:r="points.radius"
						class="bezier-chart-inner-point1"
						@mousedown="mouseClickPoint1(true)"
						:fill="colours.circle1"
						tabindex="0"
						@keydown.prevent.left="point1.x--"
						@keydown.prevent.right="point1.x++"
						@keydown.prevent.up="point1.y--"
						@keydown.prevent.down="point1.y++"
						@keydown="setBezier()"
					/>
					<line
						x1="200"
						y1="100"
						:x2="point2.x"
						:y2="point2.y"
						stroke-width="1"
						:stroke="lines.stroke"
					/>
					<circle
						:cx="point2.x"
						:cy="point2.y"
						:r="points.radius"
						class="bezier-chart-inner-point2"
						@mousedown="mouseClickPoint2(true)"
						:fill="colours.circle2"
						tabindex="0"
						@keydown.prevent.left="point2.x--"
						@keydown.prevent.right="point2.x++"
						@keydown.prevent.up="point2.y--"
						@keydown.prevent.down="point2.y++"
						@keydown="setBezier()"
					/>
				</g>
			</g>
		</svg>

		<div class="bezierContainer-info">
			<div class="mb-3">
				Animation speed:
				<div class="bezierContainer-info-speed">
					<input
						type="range"
						min="100"
						max="1500"
						v-model="animationSpeed"
						step="10"
						@change="emitBezierVals"
					/>
					<span>{{ animationSpeed }}ms</span>
				</div>
			</div>
			<div>
				Cubic Bezier: 
			</div>
			<div class="mb-3">
				({{ bezierTextConstructor }})
			</div>
			<div class="mb-1">
				Transition Demo: 
			</div>
			<div class="mb-3">
				<button
					:style="demoButtonStyle"
					class="bezierContainer-info-button"
				>
					HOVER
				</button>
			</div>
			<div class="mb-1">
				Choose preset:
			</div>
			<div>
				<select @change="selectPreset">
					<option disabled selected>Select</option>
					<option value="0.12,0,0.39,0">easeInSine</option>
					<option value="0.61,1,0.88,1">easeOutSine</option>
					<option value="0.37,0,0.63,1">easeInOutSine</option>
					<option value="0.11,0,0.5,0">easeInQuad</option>
					<option value="0.5,1,0.89,1">easeOutQuad</option>
					<option value="0.45,0,0.55,1">easeInOutQuad</option>
					<option value="0.32,0,0.67,0">easeInCubic</option>
					<option value="0.33,1,0.68,1">easeOutCubic</option>
					<option value="0.65,0,0.35,1">easeInOutCubic</option>
					<option value="0.5,0,0.75,0">easeInQuart</option>
					<option value="0.25,1,0.5,1">easeOutQuart</option>
					<option value="0.76,0,0.24,1">easeInOutQuart</option>
					<option value="0.64,0,0.78,0">easeInQuint</option>
					<option value="0.22,1,0.36,1">easeOutQuint</option>
					<option value="0.83,0,0.17,1">easeInOutQuint</option>
					<option value="0.7,0,0.84,0">easeInExpo</option>
					<option value="0.16,1,0.3,1">easeOutExpo</option>
					<option value="0.87,0,0.13,1">easeInOutExpo</option>
					<option value="0.55,0,1,0.45">easeInCirc</option>
					<option value="0,0.55,0.45,1">easeOutCirc</option>
					<option value="0.85,0,0.15,1">easeInOutCirc</option>
					<option value="0.36,0,0.66,-0.56">easeInBack</option>
					<option value="0.34,1.56,0.64,1">easeOutBack</option>
					<option value="0.68,-0.6,0.32,1.6"
						>easeInOutBack</option
					>
				</select>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["bezierLiveVals"],
	emits: {
		"pass-bezier-values": function(vals) {
			if (vals) {
				return true;
			} else {
				console.log("no beziergen vals passed");
				return false;
			}
		},
	},
	data() {
		return {
			chartWidth: 200,
			chartHeight: 400, // changing this to more/less breaks it, need to make this flexible
			movePoint1: false,
			movePoint2: false,
			mouseXPos: 0,
			mouseYPos: 0,
			trackMouse: false,
			animationSpeed: 300,
			lines: {
				stroke: "#000000b0",
				width: "1",
			},
			points: {
				radius: 6,
			},
			point1: {
				x: 50,
				y: 250,
			},
			point2: {
				x: 150,
				y: 150,
			},
			bezier: {
				p1: "0.25",
				p2: "0.25",
				p3: "0.75",
				p4: "0.75",
			},
			themeColours: {
				darkgrey: "#2b2d42",
				midgrey: "#8d99ae",
				lightGrey: "#edf2f4",
				lightRed: "#ef233c",
				darkred: "#d90429",
			},
			colours: {
				bezierStroke: '#000',
				innerChartFill: 'none',
				innerChartBorder: '#000',
				outerChartFill: 'none',
				outerChartBorder: 'red',
				circle1: "#ef233c",
				circle2: "#8d99ae",
				speedSliderBackground: "#fff",
				speedSliderThumb: "#2c3e50",
				speedSliderThumbHover: "#ef233c",
				demoButtonBackColour1: "#fff",
				demoButtonBackColour2: "#48bfe3",
			}
		};
	},
	computed: {
		bezierDrawPath() {
			const p1 = this.point1;
			const p2 = this.point2;
			return `M 0 300 C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, 200 100`;
		},
		bezierTextConstructor() {
			const b = this.bezier;
			return `${b.p1}, ${b.p2}, ${b.p3}, ${b.p4}`;
		},
		demoButtonStyle() {
			let style = `all ${this.animationSpeed}ms cubic-bezier(${this.bezierTextConstructor})`;
			return {
				transition: style,
			};
		},
		setViewbox() {
			return `0 0 ${this.chartWidth} ${this.chartHeight}`;
		},
		innerChartAttrs() {
			return {
				y: this.chartHeight / 2 - this.chartWidth / 2, // positioned in center
				x: "1",
				height: this.chartWidth,
				width: this.chartWidth - 2, //-2 to get the borders in
			};
		},
		chartOffset() {
			return {
				x: this.$refs.innerChart.getBoundingClientRect().left,
				innerY: this.$refs.innerChart.getBoundingClientRect().top,
				y: this.$refs.mainChart.getBoundingClientRect().top,
				width: this.$refs.innerChart.getBoundingClientRect().width,
				height: this.$refs.mainChart.getBoundingClientRect().height,
				innerHeight: this.$refs.innerChart.getBoundingClientRect()
					.height,
			};
		},
		cssVars() {
			return {
				'--speedslide-back': this.colours.speedSliderBackground,
				'--speedslide-thumb': this.colours.speedSliderThumb,
				'--speedslide-thumbhover': this.colours.speedSliderThumbHover,
				'--demobutton-backcolour1': this.colours.demoButtonBackColour1,
				'--demobutton-backcolour2': this.colours.demoButtonBackColour2,
			};
		},
	},
	methods: {
		resetListener() {
			this.trackMouse = false;
			this.movePoint1 = false;
			this.movePoint2 = false;
		},
		mouseTrack(e) {
			// getting right cubix vals for points - y is more awkward since the offset is measure from the top, so its flipped
			if (this.trackMouse) {
				// set x point
				let xOffset = e.offsetX / this.chartOffset.width;
				let xBezierPoint = xOffset.toFixed(2);
				let setBezierPositionX =
					(e.offsetX / this.chartOffset.width) * this.chartWidth;
				// set y point
				let yOffset =
					this.chartOffset.height -
					e.offsetY -
					this.chartOffset.width / 2;
				let yBezierPoint = yOffset / this.chartOffset.innerHeight;
				let setBezierPositionY =
					(e.offsetY / this.chartOffset.height) * this.chartHeight;
				if (this.movePoint1) {
					this.bezier.p1 = xBezierPoint;
					this.point1.x = setBezierPositionX;
					this.bezier.p2 = yBezierPoint.toFixed(2);
					this.point1.y = setBezierPositionY;
				} else if (this.movePoint2) {
					this.bezier.p3 = xBezierPoint;
					this.point2.x = setBezierPositionX;
					this.bezier.p4 = yBezierPoint.toFixed(2);
					this.point2.y = setBezierPositionY;
				}
				this.emitBezierVals();
			}
		},
		mouseClickPoint1(bool) {
			this.movePoint1 = bool;
			this.trackMouse = true;
		},
		mouseClickPoint2(bool) {
			this.movePoint2 = bool;
			this.trackMouse = true;
		},
		selectPreset(e) {
			const chosenValue = e.target.value.split(",");
			// set bezier text
			this.bezier = {
				p1: chosenValue[0],
				p2: chosenValue[1],
				p3: chosenValue[2],
				p4: chosenValue[3],
			};
			// set points in graph
			this.point1.x = chosenValue[0] * this.chartWidth;
			this.point1.y =
				this.chartWidth * 1.5 -
				this.innerChartAttrs.height * chosenValue[1];
			this.point2.x = chosenValue[2] * this.chartWidth;
			this.point2.y =
				this.chartWidth * 1.5 -
				this.innerChartAttrs.height * chosenValue[3];
		},
		setBezier() {
			this.bezier.p1 = (this.point1.x / this.chartWidth).toFixed(2);
			let yOffsetP2 = this.chartHeight - this.point1.y - this.chartWidth / 2;
			this.bezier.p2 = (yOffsetP2 / this.chartWidth).toFixed(2);
			this.bezier.p3 = (this.point2.x / this.chartWidth).toFixed(2);
			let yOffsetP4 = this.chartHeight - this.point2.y - this.chartWidth / 2;
			this.bezier.p4 = (yOffsetP4 / this.chartWidth).toFixed(2);
		},
		emitBezierVals() {
			this.$emit("pass-bezier-values", {
				bezierPoints: this.bezier,
				speed: parseInt(this.animationSpeed),
			});
		},
	},
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss" scoped>
.bezierContainer {
	position: relative;
	svg {
		width: 50%;
	}
	&-info {
		position: absolute;
		height: auto;
		width: 45%;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		&-button {
			display: block;
			position: relative;
			padding: 10px 80px;
			background: right top/210% 100% linear-gradient(to right, var(--demobutton-backcolour2) 50%, var(--demobutton-backcolour1) 50%);
			border-radius: 8px;
			text-transform: uppercase;
			overflow: hidden;
			letter-spacing: 1px;
			font-size: 14px;
			&:hover,
			&:focus {
				background: left top/210% 100% linear-gradient(to right, var(--demobutton-backcolour2) 50%, var(--demobutton-backcolour1) 50%);
			}
		}
		&-speed {

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
}
</style>
