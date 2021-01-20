<template>
	<section>
		<p>Buttons list</p>
		<div class="container-fluid">
			<div class="row">
				<button1 :button-data="buttonData" :all-button-style="allButtonStyle"></button1>
			</div>
		</div>
	</section>
</template>

<script>
import button1 from "./buttons/Button1.vue";

export default {
    props: ['buttonData'],
	components: {
		button1: button1,
	},
	data() {
		return {
            allButtonStyle: {
                padding: '25px 50px',
            }
		};
	},
	computed: {},
	mounted() {},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
