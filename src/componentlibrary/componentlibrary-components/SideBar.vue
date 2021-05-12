<template>
	<nav aria-label="Primary" class="sidebar" :style="cssVars">
		<ul v-for="(item, parentkey) in componentList" :key="item">
			<li>
				<h3 class="sidebar-parentcategory">{{ parentkey }}</h3>
				<ul>
					<li v-for="(subitem, key) in item" :key="key">
						<button @click="menuItemClick(parentkey + subitem.group)" class="sidebar-groupbutton" :class="{__active: currentCategory == subitem.group}">
							<span>{{subitem.group}}</span>
						</button>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "sidebar",
	props: ["currentCategory", "componentList","topBarHeight"],
	data() {
		return {
		};
	},
	computed: {
		cssVars() {
			var topbarHeight = this.topBarHeight;
			return {
				"--sidebar-height": 'calc(100vh - ' + topbarHeight + 'px)',
			};
		},
	},
	methods: {
		menuItemClick(key) {
			event.stopPropagation();
			this.$emit("update-current-category", key);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
	background: #6b6b6b;
	color: #fff;
	padding: 25px 10px;
	height: 100%;
	min-height: 100%;
	@media (min-width: 576px) {
        height: var(--sidebar-height);
		overflow: auto;
    }
	&-parentcategory {
		font-size: 25px;
		margin: 0;
	}
	&-groupbutton {
		outline: none;
		border: none;
		background: none;
		color: #fff;
		span {
			width: calc(100%);
			background-image: linear-gradient(transparent calc(100% - 10px), #fff 0px);
			background-repeat: no-repeat;
			background-size: 0 6%;
			background-position: left bottom;
			transition: background-size 0.2s;
		}
		&:hover,
		&:focus,
		&.__active {
			span {
				background-size: 100% 6%;
			}
		}
	}
	ul {
		padding: 0 0 0 16px;
		li {
			list-style-type: none;
			font-weight: 500;
			ul {
				margin: 10px 0 0 0;
			}
		}
	}
	> ul {
		padding: 0 0 25px 30px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.24);
	}
}
</style>
