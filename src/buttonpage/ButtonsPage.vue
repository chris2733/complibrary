<template>
	<div class="buttonshead">
		<section class="buttonshead-panels">
			<div
				class="buttonshead-panels-panel __colourpanel"
				v-if="showPanel == 'panel1'"
				data-simplebar
				data-simplebar-auto-hide="false"
			>
				<colour-picker
					@pass-colour-values="updateTextColour"
					:set-initial-colour="colourPickerTextColour"
					:picker-settings="{ title: 'Text colour'}"
				></colour-picker>
				<colour-picker
					@pass-colour-values="updateTextHoverColour"
					:set-initial-colour="colourPickerTextHoverColour"
					:picker-settings="{ title: 'Text Hover colour'}"
				></colour-picker>
				<colour-picker
					@pass-colour-values="updatePrimaryColour"
					:set-initial-colour="colourPickerPrimary"
					:picker-settings="{ title: 'Primary colour'}"
				></colour-picker>
				<colour-picker
					@pass-colour-values="updateSecondaryColour"
					:set-initial-colour="colourPickerSecondary"
					:picker-settings="{ title: 'Secondary colour'}"
				></colour-picker>
			</div>
			<div class="buttonshead-panels-panel" v-if="showPanel == 'panel2'">
				<div class="buttonshead-panels-panel-bezierpanel mx-auto">
					<bezier-gen
						@pass-bezier-values="updateBezier"
						:bezier-live-vals="bezier"
					></bezier-gen>
				</div>
			</div>
			<div class="buttonshead-panels-panel" v-if="showPanel == 'panel3'">
				<text-styling-editor
					@pass-styling-values="updateTextStyles"
					:button-data="buttonData"
				></text-styling-editor>
			</div>
			<div class="buttonshead-panels-panel" v-if="showPanel == 'panel4'">
				<button-dimensions
					@pass-dimensions-values="updateDimensions"
					:button-data="buttonData"
				></button-dimensions>
			</div>
		</section>
		<section class="buttonshead-main">
			<div class="buttonshead-tabs">
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel1')"
					:class="{'__active' : showPanel == 'panel1'}"
				>
					<img src="../assets/paintimg.png" alt="" />
				</button>
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel2')"
					:class="{'__active' : showPanel == 'panel2'}"
				>
					<img src="../assets/bounceimg.png" alt="" />
				</button>
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel3')"
					:class="{'__active' : showPanel == 'panel3'}"
				>
					<img src="../assets/textimg.png" alt="" />
				</button>
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel4')"
					:class="{'__active' : showPanel == 'panel4'}"
				>
					<img src="../assets/dimensions.png" alt="" />
				</button>
			</div>
		</section>
		<section class="buttonshead-textfill">
			<p>Button Text</p>
			<input type="text" v-model="buttonFillText" />
		</section>
	</div>
	<div class="buttonsbody" ref="buttonbody">
		<buttons-list :button-data="buttonData"></buttons-list>
	</div>
</template>

<script>
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import buttonsList from "./components/ButtonList.vue";
import bezierGen from "./components/BezierGenerator.vue";
import colourPicker from "./components/ColourPicker.vue";
import textStylingEditor from "./components/TextStylingEditor.vue";
import ButtonDimensions from "./components/ButtonDimensions.vue";

export default {
	components: {
		buttonsList,
		bezierGen,
		colourPicker,
		textStylingEditor,
		ButtonDimensions,
	},
	data() {
		return {
			buttonFillText: "Button",
			showPanel: null,
			bezier: {
				bezierVal: [0.25, 0.25, 0.75, 0.75],
				speed: 300,
			},
			colourPickerTextColour: "#ffffff",
			colourPickerTextHoverColour: "#eeeeee",
			colourPickerPrimary: "#00adb5", //needs to be hex, need to set checker on this
			colourPickerSecondary: "#393e46", //needs to be hex, need to set checker on this
			paddingX: 50, // set in px
			paddingY: 25, // set in px
			fontWeight: 400,
			fontSize: 14, // set in px
			letterSpacing: 1, // set in px, doesnt work unless a num
			borderRadius: 0, // set in px
		};
	},
	computed: {
		paddingStr() {
			return `${this.paddingY}px ${this.paddingX}px`
		},
		buttonData() {
			return {
				text: this.buttonFillText,
				textColour: this.colourPickerTextColour,
				textHoverColour: this.colourPickerTextHoverColour,
				primaryColour: this.colourPickerPrimary,
				secondaryColour: this.colourPickerSecondary,
				bezier: this.bezier.bezierVal.toString(),
				transition: this.bezier.speed,
				padding: this.paddingStr,
				fontWeight: this.fontWeight,
				fontSize: this.fontSize,
				letterSpacing: this.letterSpacing,
				borderRadius: this.borderRadius,
				paddingX: this.paddingX,
				paddingY: this.paddingY,
			};
		},
	},
	methods: {
		showHidePanel(panelNo) {
			if (this.showPanel == panelNo) {
				this.showPanel = null;
			} else {
				this.showPanel = panelNo;
			}
		},
		updateBezier(newvals) {
			this.bezier.bezierVal = Object.values(newvals.bezierPoints);
			this.bezier.speed = newvals.speed;
		},
		updateTextColour(colourval) {
			this.colourPickerTextColour = colourval;
		},
		updateTextHoverColour(colourval) {
			this.colourPickerTextHoverColour = colourval;
		},
		updatePrimaryColour(colourval) {
			this.colourPickerPrimary = colourval;
		},
		updateSecondaryColour(colourval) {
			this.colourPickerSecondary = colourval;
		},
		updateTextStyles(textVals) {
			this.fontWeight = textVals.fontWeight;
			this.fontSize = textVals.fontSize;
			this.letterSpacing = textVals.letterSpacing;
		},
		updateDimensions(dimensions) {
			this.borderRadius = dimensions.borderRadius;
			this.paddingY = dimensions.paddingY;
			this.paddingX = dimensions.paddingX;
		}
	},
	mounted() {
		var colors = {
			lightgreen: "font-weight: bold; color: #06d6a0;",
			red: "font-weight: bold; color: #EC5f67;",
			orange: "font-weight: bold; color: #F99157;",
			yellow: "font-weight: bold; color: #FAC863;",
			green: "font-weight: bold; color: #99C794;",
			teal: "font-weight: bold; color: #5FB3B3;",
			blue: "font-weight: bold; color: #6699CC;",
			purple: "font-weight: bold; color: #C594C5;",
			brown: "font-weight: bold; color: #AB7967;",
		};
		console.log(
			"%cC %cO %cL %cO %cU %cR %cF %cU %cL",
			colors.lightgreen,
			colors.red,
			colors.orange,
			colors.yellow,
			colors.green,
			colors.teal,
			colors.blue,
			colors.purple,
			colors.brown,
		);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.buttonshead {
	color: #fff;
	border-top: 1px solid #fff3;
	&-main {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 0 0 0 20px;
	}
	&-tabs {
		&-each {
			position: relative;
			display: inline-block;
			height: 80px;
			width: 80px;
			transition: all 0.3s ease;
			background: transparent;
			border-left: 1px solid #fff3;
			&:hover,
			&:focus,
			&.__active {
				background: #383838;
			}
			img {
				height: 25px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
	&-textfill {
		display: flex;
		p {
			padding: 20px;
			border-top: 1px solid #fff3;
			margin: 0;
		}
		input {
			flex-grow: 1;
			padding: 0 20px;
		}
	}
	&-panels {
		&-panel {
			padding: 50px 100px;
			border-bottom: 1px solid #fff3;
			&.__colourpanel {
				white-space: nowrap;
				overflow: auto;
			}
			&-bezierpanel {
				max-width: 600px;
			}
		}
	}
}
</style>
