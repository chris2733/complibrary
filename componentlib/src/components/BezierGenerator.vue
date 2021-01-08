<template>
	<figure>
		<canvas
			id="bezierCanvasGen"
			@mousedown="bezierCanvasMouseDown"
			@mousemove="bezierCanvasMouseMove"
			@mouseup="resetMouse"
			@mouseleave="resetMouse"
			:width="canvasWidth"
			:height="canvasHeight"
		></canvas>
		<figcaption id="labelFontSize" class="bezierInfo">
			<div id="transitionDemo" class="bezierInfo-demo" :style="setTransitionDemo"> hover </div>
			<div class="bezierInfo-speed">
				<label for="speedSlider">Animation Speed: <span id="speedSliderVal">{{ speedSliderTransition }}ms</span></label>
				<input
					type="range"
					id="speedSlider"
					min="100"
					max="1500"
					v-model="speedSliderTransition"
					step="10"
					@change="emitValues"
				/>
			</div>
			<div class="bezierInfo-bezier">
				<p>Cubic Bezier:</p>
				<span id="currentEasingP1">{{ cubicP1 }}</span
				>, <span id="currentEasingP2">{{ cubicP2 }}</span
				>, <span id="currentEasingP3">{{ cubicP3 }}</span
				>, <span id="currentEasingP4">{{ cubicP4 }}</span>
			</div>
			<div class="bezierInfo-presets">
				<div class="presetBezier">
					Choose a preset:
				</div>
				<select
						name=""
						id="presetBezierSelect"
						@change="presetBezierSelectChange"
					>
						<option value="[0.12, 0, 0.39, 0]">easeInSine</option>
						<option value="[0.61, 1, 0.88, 1]">easeOutSine</option>
						<option value="[0.37, 0, 0.63, 1]"
							>easeInOutSine</option
						>
						<option value="[0.11, 0, 0.5, 0]">easeInQuad</option>
						<option value="[0.5, 1, 0.89, 1]">easeOutQuad</option>
						<option value="[0.45, 0, 0.55, 1]"
							>easeInOutQuad</option
						>
						<option value="[0.32, 0, 0.67, 0]">easeInCubic</option>
						<option value="[0.33, 1, 0.68, 1]">easeOutCubic</option>
						<option value="[0.65, 0, 0.35, 1]"
							>easeInOutCubic</option
						>
						<option value="[0.5, 0, 0.75, 0]">easeInQuart</option>
						<option value="[0.25, 1, 0.5, 1]">easeOutQuart</option>
						<option value="[0.76, 0, 0.24, 1]"
							>easeInOutQuart</option
						>
						<option value="[0.64, 0, 0.78, 0]">easeInQuint</option>
						<option value="[0.22, 1, 0.36, 1]">easeOutQuint</option>
						<option value="[0.83, 0, 0.17, 1]"
							>easeInOutQuint</option
						>
						<option value="[0.7, 0, 0.84, 0]">easeInExpo</option>
						<option value="[0.16, 1, 0.3, 1]">easeOutExpo</option>
						<option value="[0.87, 0, 0.13, 1]"
							>easeInOutExpo</option
						>
						<option value="[0.55, 0, 1, 0.45]">easeInCirc</option>
						<option value="[0, 0.55, 0.45, 1]">easeOutCirc</option>
						<option value="[0.85, 0, 0.15, 1]"
							>easeInOutCirc</option
						>
						<option value="[0.36, 0, 0.66, -0.56]"
							>easeInBack</option
						>
						<option value="[0.34, 1.56, 0.64, 1]"
							>easeOutBack</option
						>
						<option value="[0.68, -0.6, 0.32, 1.6]">
							easeInOutBack
						</option>
					</select>
			</div>
		</figcaption>
	</figure>
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
			// select element with type
			canvas: "#bezierCanvasGen",
			// set newgraph prop
			newGraph: null,
			// set paintbrush
			paintbrush: null,
			// settings for canvas sizes stored here for later
			canvasWidth: 200,
			canvasHeight: 600,
			// smaller graph dimensions
			graphWidth: 200 - 2,
			graphHeight: 600 * 0.3,
			// setting startpoints of drawing
			startX: 1,
			startY: 600 * 0.3,
			// setting offset of canvas from top & bottom of window, for mouse detection
			canvasOffsetLeft: null,
			canvasOffsetTop: null,
			// set current display id variables
			currentEasingP1: document.querySelector("#currentEasingP1"),
			currentEasingP2: document.querySelector("#currentEasingP2"),
			currentEasingP3: document.querySelector("#currentEasingP3"),
			currentEasingP4: document.querySelector("#currentEasingP4"),
			// set id of transition demo to change style
			transitionDemo: document.querySelector("#transitionDemo"),
			// ids of speed slider
			speedSlider: document.querySelector("#speedSlider"),
			speedSliderVal: document.querySelector("#speedSliderVal"),
			// speed set
			speedSliderTransition: this.bezierLiveVals.speed,
			// set bezier vals
			cubicP1: this.bezierLiveVals.bezierVal[0],
			cubicP2: this.bezierLiveVals.bezierVal[1],
			cubicP3: this.bezierLiveVals.bezierVal[2],
			cubicP4: this.bezierLiveVals.bezierVal[3],
			// bezier value
			bezierPosition: {},
			// id of bezier preset select
			presetBezierSelect: document.querySelector("#presetBezierSelect"),
			// display id
			canvasEasingId: document.querySelector("#currentEasing"),
			// graph outline colour
			graphOutlineColour: "5e60ce",
			// setting mouse position, initially 0
			mouseX: 0,
			mouseY: 0,
			// -- checking mouse movements
			mouseMoved: false,
			// -- which point to move
			mousePointToMove: false,
			// radius of points
			pointRadius: 10,
			firstPointFill: "#48bfe3",
			secondPointFill: "#5e60ce",
			pointStroke: "#efefef",
			lineStroke: "#1d3557",
			// plot course of line start, starty, endx, endy
			linePosition: {
				// p1: this.startx,
				// p2: this.starty + this.canvasHeight,
				// p3: this.canvasWidth,
				// p4: this.starty,
				p1: 1,
				p2: 600 * 0.3 + 600 * 0.3,
				p3: 200,
				p4: 600 * 0.3,
			},
		};
	},
	computed: {
		setTransitionDemo() {
			var cubicString =
				"all " +
				this.speedSliderTransition +
				"ms cubic-bezier(" +
				this.cubicP1 +
				"," +
				this.cubicP2 +
				"," +
				this.cubicP3 +
				"," +
				this.cubicP4 +
				")";
			return {
				transition: cubicString,
			};
		},
	},
	methods: {
		getCanvasOffsets() {
			// checking if canvas exists, because the app triggers when its closed, need to fix
			const canvasEl = document.querySelector(this.canvas);
			if (canvasEl) {
				this.canvasOffsetLeft = canvasEl.getBoundingClientRect().left;
				this.canvasOffsetTop = canvasEl.getBoundingClientRect().top;
			}
		},
		// draw graph outline and wave
		drawGraph() {
			// set paintbrush to draw with
			this.paintbrush = document
				.querySelector("#bezierCanvasGen")
				.getContext("2d");

			// clear canvas first
			this.paintbrush.clearRect(
				0,
				0,
				this.canvasWidth,
				this.canvasHeight
			);

			// set linewidth to be small as default
			this.paintbrush.lineWidth = 1;

			// draw graph outline
			this.paintbrush.beginPath();
			this.paintbrush.strokeStyle = this.graphOutlineColour;
			this.paintbrush.rect(
				this.startX,
				this.startY,
				this.graphWidth,
				this.graphHeight
			);
			this.paintbrush.stroke();

			// draw x and y text
			this.paintbrush.font = "14px Verdana";
			this.paintbrush.fillText("x", this.startX + 5, this.startY + 15);
			this.paintbrush.fillText(
				"t",
				this.startX + this.graphWidth - 10,
				this.startY + this.graphHeight - 7
			);

			// setting bezier curve with current cubic points
			this.bezierPosition = {
				p1: this.cubicP1 * this.graphWidth,
				p2: this.startY + this.graphHeight * (1 - this.cubicP2),
				p3: this.cubicP3 * this.graphWidth,
				p4: this.startY + this.graphHeight * (1 - this.cubicP4),
			};

			// ----set the new line
			// set linewidth to be big here
			this.paintbrush.lineWidth = 3;
			// draw bezier line
			this.paintbrush.strokeStyle = "#1d3557";
			this.paintbrush.beginPath();
			this.paintbrush.moveTo(this.linePosition.p1, this.linePosition.p2);
			this.paintbrush.bezierCurveTo(
				this.bezierPosition.p1,
				this.bezierPosition.p2,
				this.bezierPosition.p3,
				this.bezierPosition.p4,
				this.linePosition.p3,
				this.linePosition.p4
			);
			this.paintbrush.stroke();

			// ----drawing the points
			// draws the draggable points at the right position
			// set linewidth to be small here
			this.paintbrush.lineWidth = 1;
			// draw line to first point
			this.paintbrush.beginPath();
			this.paintbrush.moveTo(this.linePosition.p1, this.linePosition.p2);
			this.paintbrush.lineTo(
				this.bezierPosition.p1,
				this.bezierPosition.p2
			);
			this.paintbrush.strokeStyle = this.lineStroke;
			this.paintbrush.stroke();
			// draw first point
			this.paintbrush.beginPath();
			this.paintbrush.arc(
				this.bezierPosition.p1,
				this.bezierPosition.p2,
				this.pointRadius,
				0,
				Math.PI * 2
			);
			this.paintbrush.fillStyle = this.firstPointFill;
			this.paintbrush.fill();
			this.paintbrush.strokeStyle = this.pointStroke;
			this.paintbrush.stroke();
			// draw line to second point
			this.paintbrush.beginPath();
			this.paintbrush.moveTo(this.linePosition.p3, this.linePosition.p4);
			this.paintbrush.lineTo(
				this.bezierPosition.p3,
				this.bezierPosition.p4
			);
			this.paintbrush.strokeStyle = this.lineStroke;
			this.paintbrush.stroke();
			// draw second point
			this.paintbrush.beginPath();
			this.paintbrush.arc(
				this.bezierPosition.p3,
				this.bezierPosition.p4,
				this.pointRadius,
				0,
				Math.PI * 2
			);
			this.paintbrush.fillStyle = this.secondPointFill;
			this.paintbrush.fill();
			this.paintbrush.strokeStyle = this.pointStroke;
			this.paintbrush.stroke();

			this.emitValues();
		},
		presetBezierSelectChange(e) {
			var newPreset = JSON.parse(e.target.value);
			this.cubicP1 = newPreset[0];
			this.cubicP2 = newPreset[1];
			this.cubicP3 = newPreset[2];
			this.cubicP4 = newPreset[3];
			this.drawGraph();
		},
		// listening for clicking on the drawpoints
		bezierCanvasMouseDown(e) {
			var currentMouseX = e.x - this.canvasOffsetLeft;
			var currentMouseY = e.y - this.canvasOffsetTop;
			// if mousex sits within first bezier point
			if (
				currentMouseX > this.bezierPosition.p3 - this.pointRadius &&
				currentMouseX < this.bezierPosition.p3 + this.pointRadius &&
				currentMouseY > this.bezierPosition.p4 - this.pointRadius &&
				currentMouseY < this.bezierPosition.p4 + this.pointRadius
			) {
				this.setMouseMove(true);
				this.mousePointToMove = "second";
			} else if (
				currentMouseX > this.bezierPosition.p1 - this.pointRadius &&
				currentMouseX < this.bezierPosition.p1 + this.pointRadius &&
				currentMouseY > this.bezierPosition.p2 - this.pointRadius &&
				currentMouseY < this.bezierPosition.p2 + this.pointRadius
			) {
				this.setMouseMove(true);
				this.mousePointToMove = "first";
			}
		},
		bezierCanvasMouseMove(e) {
			if (this.mouseMoved == true) {
				var mouseXMove = e.x - this.canvasOffsetLeft;
				var mouseYMove = e.y - this.canvasOffsetTop;

				// getting the inverted cubic y value becuase the graph is drawn from the top.. god dammit
				var cubicPointX = (
					(mouseXMove - this.startX) /
					this.graphWidth
				).toFixed(2);
				var cubicPointY = (mouseYMove - this.startY) / this.graphHeight;
				// inverting cubic y becuase the graph is drawn from the top.. god dammit
				var cubicPointYNew = Math.abs(cubicPointY - 1).toFixed(2);
				if (cubicPointY > 1) {
					cubicPointYNew = -Math.abs(cubicPointYNew).toFixed(2);
				}
				if (this.mousePointToMove == "first") {
					this.cubicP1 = cubicPointX;
					this.cubicP2 = cubicPointYNew;
				} else {
					this.cubicP3 = cubicPointX;
					this.cubicP4 = cubicPointYNew;
				}
				this.drawGraph();
			}
		},
		// sets mouseMoved to false
		setMouseMove(boolean) {
			this.mouseMoved = boolean;
			if (boolean !== true) {
				// set no mousepoints to move
				this.mousePointToMove == false;
			} else {
				// set cursor to grab since its moving the points
				document.body.style.cursor = "grabbing";
			}
		},
		// listening for mouse up or leave on canvas to stop moving point
		resetMouse() {
			document.body.style.cursor = "auto";
			// setting position of mouse
			this.mouseMoved = false;
			this.mousePointToMove = false;
		},
		// emits vals to parent
		emitValues() {
			const vals = {
				bezier: [
					this.cubicP1,
					this.cubicP2,
					this.cubicP3,
					this.cubicP4,
				],
				transition: this.speedSliderTransition,
			};
			this.$emit("pass-bezier-values", vals);
		},
	},
	mounted() {
		this.getCanvasOffsets();
		// -- rerun listeners on window scroll & resize
		window.addEventListener("resize", this.getCanvasOffsets);
		window.addEventListener("scroll", this.getCanvasOffsets);

		// draw graph
		this.drawGraph();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes changewidth {
	from {
		width: 0;
	}

	to {
		width: 100%;
	}
}

figure {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	canvas {
		margin: 0;
		padding: 0;
	}
	.canvasBezier {
		position: absolute;
		left: 50%;
		transform: translate(50%, -50%);
		top: 50%;
	}
	.bezierInfo {
		position: relative;
		color: #d5d5d5;
		padding: 180px 0 0 30px;
		width: 220px;
		p {
			margin: 0;
		}
		&-speed {
			margin: 0 0 20px 0;
			label {
				display: block;
			}
			input {

			}
		}
		&-bezier {
			margin: 0 0 20px 0;
		}
		&-demo {
			display: block;
			position: relative;
			padding: 10px;
			border: 2px solid #d5d5d5;
			border-radius: 8px;
			text-transform: uppercase;
			overflow: hidden;
			margin: 0 0 20px 0;
			letter-spacing: 1.5px;
			font-size: 12px;
			user-select: none;
			text-align: center;
			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 0;
				background: #48bfe3;
				transition: inherit;
			}
			&:hover {
				color: rgba(0, 0, 0, 0);
				&::before {
					width: 100%;
				}
			}
		}
		&-presets {
			select {
				margin: 5px 0 0 0;
				width: 100%;
			}
		}
	}
}
</style>
