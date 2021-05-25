<template>
	<div class="iframewrapper">
        <div class="iframewrapper-title" v-if="title">
            <h5>{{ title }}</h5>
        </div>
		<iframe
            :height="iframeHeight"
			style="width: 100%;"
			scrolling="no"
			data-default-tab="result"
			preview="true"
			:src="embedLink"
			frameborder="no"
			loading="lazy"
			allowtransparency="true"
			allowfullscreen="true"
			:style="cssVars"
		>
		</iframe>
	</div>
</template>

<script>
export default {
	name: "codepen iframe",
	props: ["title", "link", "height"],
	data() {
		return {
			iframeHeight: 500,
		};
	},
	computed: {
		embedLink() {
			// replace pen link with embed link
			let regexLinkReplace = /\/pen\//;
			const embedLink = this.link.replace(regexLinkReplace, "/embed/");
			return `${embedLink}?theme-id=dark`;
		},
		cssVars() {
			return {
				"--fullheight": (this.height ? this.height : 0),
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.iframewrapper {
    &-title {
        background: #000;
        color: #fff;
        padding: 10px 15px;
    }
	iframe {
		min-height: var(--fullheight);
	}
}
</style>
