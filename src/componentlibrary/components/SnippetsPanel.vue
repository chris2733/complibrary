<template>
    <div class="snippets">
        <div class="container">
            <div class="row">
                <div class="col-12 mt-5 mb-5">
                    <h1>Random useful snippets</h1>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">
                    IE snippet
                </div>
                <div class="col-9">
                    <div class="snippets-code">
                        <pre>if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" &amp;&amp; $.browser.msie == 1)) {
                            alert("Please dont use IE.");
                        }
                        </pre>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-3">
                    Making Iframe same height as content
                </div>
                <div class="col-9">
                    <div class="snippets-code">
                        <pre>function resizeIframe(obj) {
                            obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
                        }
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	name: "Snippets panel",
	data() {
		return {}
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.snippets {
    background: #fff;
    min-height: 100vh;
    &-code {
        pre {
            font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
            background: #000;
            color: #fff;
            padding: 20px;
            white-space: pre-wrap;
            tab-width: 4;
            border-radius: 7px;
        }
    }
}
</style>
