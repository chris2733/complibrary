<template>
    <div class="plugins">
        <div class="container">
            <div class="row mb-3">
                <div class="col-12 my-5">
                    <h1>Plugins</h1>
                </div>
            </div>
            <div class="plugins-list">
                <div class="row">
                    <div :class="columns">
                        <h4>General animations</h4>
                        <a target="_blank" href="https://greensock.com/gsap/">GSAP</a>
                        <a target="_blank" href="https://animejs.com/">AnimeJS</a>
                        <a target="_blank" href="http://paperjs.org/">PaperJS</a>
                    </div>
                    <div :class="columns">
                        <h4> Interactive components</h4>
                        <a target="_blank" href="https://skidding.github.io/dragdealer/">Dragdealer</a>
                    </div>
                    <div :class="columns">
                        <h4>SVGs</h4>
                        <a target="_blank" href="http://snapsvg.io/">Snap SVG</a>
                    </div>
                    <div :class="columns">
                        <h4>Videos</h4>
                        <a target="_blank" href="https://plyr.io/">Plyr</a>
                    </div>
                    <div :class="columns">
                        <h4>Animating text</h4>
                        <a target="_blank" href="https://splitting.js.org/">Splitting JS</a>
                        <a target="_blank" href="http://demo.tinywall.net/numscroller/">Numscroller</a>
                    </div>
                    <div :class="columns">
                        <h4>Masonry</h4>
                        <a target="_blank" href="https://masonry.desandro.com/">Masonryjs</a>
                        <a target="_blank" href="http://kombai.github.io/freewall/">Freewall</a>
                        <a target="_blank" href="https://isotope.metafizzy.co/">Isotope</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "Plugins panel",
	data() {
		return {
            columns: "col-md-6 col-lg-4 mb-4"
        }
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.plugins {
    background: #fff;
    min-height: 100vh;
    &-list {
        a {
            display: block;
        }
    }
}
</style>
