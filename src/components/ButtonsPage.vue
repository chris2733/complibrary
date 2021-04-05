<template>
	<div class="buttonshead">
		<p class="whitetext">{{ bezier.bezierVal }}</p>
		<p class="whitetext">{{ bezier.speed }}</p>
		<p class="whitetext">{{ colourPickerTextColour }}</p>
		<p class="whitetext">{{ colourPickerTextHoverColour }}</p>
		<p class="whitetext">{{ colourPickerPrimary }}</p>
		<p class="whitetext">{{ colourPickerSecondary }}</p>
		<p class="whitetext">{{ buttonFillText }}</p>
		<section class="buttonshead-panels">
			<div
				class="buttonshead-panels-panel __colourpanel"
				v-if="showPanel == 'panel1'"
			>
				<colour-picker
					@pass-colour-values="updateTextColour"
					:set-initial-colour="colourPickerTextColour"
				></colour-picker>
				<colour-picker
					@pass-colour-values="updateTextHoverColour"
					:set-initial-colour="colourPickerTextHoverColour"
				></colour-picker>
				<colour-picker
					@pass-colour-values="updatePrimaryColour"
					:set-initial-colour="colourPickerPrimary"
				></colour-picker>
				<colour-picker
					@pass-colour-values="updateSecondaryColour"
					:set-initial-colour="colourPickerSecondary"
				></colour-picker>
			</div>
			<div class="buttonshead-panels-panel" v-if="showPanel == 'panel2'">
				<bezier-gen
					@pass-bezier-values="updateBezier"
					:bezier-live-vals="bezier"
				></bezier-gen>
			</div>
			<div class="buttonshead-panels-panel" v-if="showPanel == 'panel3'">
				panel 3
			</div>
		</section>
		<section class="buttonshead-main">
			<p>Buttons Page</p>
			<div class="buttonshead-tabs">
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel1')"
				>
					<img src="../assets/paintimg.png" alt="" />
				</button>
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel2')"
				>
					<img src="../assets/bounceimg.png" alt="" />
				</button>
				<button
					class="buttonshead-tabs-each"
					@click="showHidePanel('panel3')"
				>
					<img src="../assets/textimg.png" alt="" />
				</button>
			</div>
		</section>
		<section class="buttonshead-textfill">
			<p>Button Text</p>
			<input type="text" v-model="buttonFillText" />
		</section>
		<buttons-list :button-data="buttonData"></buttons-list>
	</div>
</template>

<script>
import buttonsList from "./ButtonList.vue";
import bezierGenerator from "./BezierGenerator.vue";
import colourPicker from "./ColourPicker.vue";

export default {
	components: {
		"buttons-list": buttonsList,
		"bezier-gen": bezierGenerator,
		"colour-picker": colourPicker,
	},
	data() {
		return {
			buttonFillText: "Button",
			showPanel: null,
			bezier: {
				bezierVal: [0.25, 0.25, 0.75, 0.75],
				speed: 300,
			},
			colourPickerTextColour: "#fff",
			colourPickerTextHoverColour: "#000",
			colourPickerPrimary: "#c0d91e", //needs to be hex, need to set checker on this
			colourPickerSecondary: "#2919bd", //needs to be hex, need to set checker on this
		};
	},
	computed: {
		buttonData() {
			return {
				text: this.buttonFillText,
				textColour: this.colourPickerTextColour,
				textHoverColour: this.colourPickerTextHoverColour,
				primaryColour: this.colourPickerPrimary,
				secondaryColour: this.colourPickerSecondary,
				bezier: this.bezier.bezierVal.toString(),
				transition: this.bezier.speed,
				padding: '25px 50px'
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
			const newarr = [];
			newvals.bezier.forEach((el) => {
				newarr.push(parseFloat(el));
			});
			this.bezier.bezierVal = newarr;
			this.bezier.speed = parseInt(newvals.transition);
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
		justify-content: space-between;
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
			&:focus {
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
		}
		input {
			flex-grow: 1;
			padding: 0 20px;
		}
	}
	&-panels {
		&-panel {
			&.__colourpanel {
				padding: 50px 100px;
				white-space: nowrap;
				overflow: auto;
			}
		}
	}
}
</style>
