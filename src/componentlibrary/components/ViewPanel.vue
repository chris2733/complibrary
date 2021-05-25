<template>
	<div class="panel" :style="cssVars">
		<!-- Placeholder if nothing in view -->
		<section class="text-center py-5 panel-start" v-if="currentCategory == null">
			<h2>Select Category</h2>
		</section>
		<!-- Components -->
		<div v-for="(item, parentkey) in componentList" :key="item">
			<div v-for="subitem in item" :key="subitem">
				<div v-for="(linkItem, key) in subitem.content" :key="key">
					<codepenIframe :title="key" :link="linkItem" v-if="(parentkey + subitem.group) == currentCategory"/>
				</div>
			</div>
		</div>
		<!-- Font switcher -->
		<div v-if="currentCategory == 'topbar-fontswitcher'">
			<codepenIframe :height="viewportHeight" link="https://codepen.io/bongocat/full/yLVVrmX" />
		</div>
		<!-- Plugins -->
		<div v-if="currentCategory == 'topbar-plugins'">
			<pluginsPanel></pluginsPanel>
		</div>
		<!-- Snippets -->
		<div v-if="currentCategory == 'topbar-snippets'">
			<snippetsPanel></snippetsPanel>
		</div>
	</div>
</template>

<script>
import codepenIframe from "./CodepenIframe.vue";
import pluginsPanel from "./PluginsPanel.vue";
import snippetsPanel from "./SnippetsPanel.vue";

export default {
	name: "view panel",
	props: ["currentCategory", "componentList", "topBarHeight"],
	components: {
		codepenIframe,
		snippetsPanel,
		pluginsPanel
	},
	data() {
		return {
		}
	},
	computed: {
		viewportHeight() {
			// viewport height calc with the topbar
			let topbarHeight = this.topBarHeight;
			return 'calc(100vh - ' + topbarHeight + 'px)';
		},
		cssVars() {
			return {
				"--panel-height": this.viewportHeight,
			};
		},
	},
	methods: {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
	background: #000;
	height: var(--panel-height);
	overflow: auto;
	&-start {
		background: #fff;
		height: 100%;
	}
}
</style>
