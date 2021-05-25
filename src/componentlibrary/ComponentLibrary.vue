<template>
	<div class="container-fluid p-0">
		<div class="row no-gutters">
			<div class="col-12">
				<TopBar @update-current-category="updateCurrentCategory" @topbar-height="gettopBarHeight"/>
			</div>
			<div class="col-md-4 col-lg-3 col-xl-2">
				<SideBar @update-current-category="updateCurrentCategory" :component-list="componentList" :current-category="currentCategory" :top-bar-height="topBarHeight"/>
			</div>
			<div class="col-md-8 col-lg-9 col-xl-10">
				<ViewPanel :current-category="currentCategory" :component-list="componentList" :top-bar-height="topBarHeight"/>
			</div>
		</div>
	</div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/SideBar.vue";
import ViewPanel from "./components/ViewPanel.vue";

export default {
	name: "App",
	components: {
		TopBar,
		SideBar,
		ViewPanel,
	},
	data() {
		return {
			topBarHeight: 0,
			currentCategory: null,
			componentList: {
				'Navigation': [
					{
						group: 'Menus',
						content: {
							Megamenu: 'https://codepen.io/Chris2733/pen/RwwZpdL',
							'Scrolling navigation': 'https://codepen.io/spindogs/pen/mdEGeyV',
						},
					},
					{
						group: 'Scrollbars',
						content: {
							Scrollbar: 'https://codepen.io/Chris2733/pen/rNONWKR',
							'Slider scroll': 'https://codepen.io/spindogs/pen/YzWOyyP'
						},
					},
				],
				'Sliders': [
					{
						group: 'Draggable',
						content: {
							'Horizontal click and drag': 'https://codepen.io/spindogs/pen/GRqXppZ',
						},
					},
					{
						group: 'Tabs',
						content: {
							'Slick Slider w Tabs': 'https://codepen.io/preghostphase/pen/qBqYWGz',
						},
					},
					{
						group: 'Lightbox',
						content: {
							'Slick lightbox': 'https://codepen.io/spindogs/pen/ExyeVYO',
						},
					}
				],
				'Media': [
					{
						group: 'Video',
						content: {
							Video: 'https://codepen.io/Chris2733/pen/xxbKwMm'
						},
					},
					{
						group: 'Images',
						content: {
							'Tilt.js': 'https://codepen.io/CupOfTegan/pen/bGBwbXm'
						},
					},
					{
						group: 'SVGs',
						content: {
							'Reverse SVG path': 'https://codepen.io/enxaneta/pen/WWPYqQ'
						},
					}
				],
				'Text': [
					{
						group: 'Animations',
						content: {
							'Underline animation': 'https://codepen.io/spindogs/pen/ZEOMbWj',
							'Animating characters': 'https://codepen.io/spindogs/pen/QWEVjNO',
							'Rotating text': 'https://codepen.io/preghostphase/pen/GRNgaMb',
							'Lettering/TweenMax JS text intro': 'https://codepen.io/preghostphase/pen/OJbPGQB'
						},
					}
				],
				'Javascript': [
					{
						group: 'Assorted',
						content: {
							'Clipboardjs': 'https://codepen.io/Chris2733/pen/QWjqvjP',
							'Round button': 'https://codepen.io/jonsp/pen/GRJKrYv',
							'Mouse follow': 'https://codepen.io/spindogs/pen/yLJxNrp'
						},
					}
				],
				'CSS': [
					{
						group: 'Gradients',
						content: {
							'Gradient border and border radius': 'https://codepen.io/bongocat/pen/jOVxzbY',
						},
					}
				],
				'Forms': [
					{
						group: 'Labels',
						content: {
							'Label moving up': 'https://codepen.io/preghostphase/pen/OJRXqNm',
						},
					}
				],
				'Custom Cursors': [
					{
						group: 'Cusors',
						content: {
							'Custom Cursor': 'https://codepen.io/preghostphase/pen/VwPawBj',
							'Custom Cursor w Custom Text on hover': 'https://codepen.io/preghostphase/pen/QWdyXKa',
						},
					}
				],
				'Alerts': [
					{
						group: 'SweetAlert 2 JS',
						content: {
							'SweetAlert 2 JS Alertbox': 'https://codepen.io/preghostphase/pen/XWppXQQ?editors=0011',
						},
					}
				]
			}
		}
	},
	methods: {
		updateCurrentCategory(key) {
			this.currentCategory = key;
		},
		gettopBarHeight(val) {
			this.topBarHeight = val;
		},
	},
};
</script>

<style lang="scss">
.mainbody {
}
</style>
