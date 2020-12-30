<template>
    <div class="buttonwrap">
    </div>
</template>

<script>
// import styled from 'vue-styled-components';

export default {
    data() {
        return {
            buttonHTML: `<button>
    <span>Button</span>
</button>`,
            buttonCSS: `display: inline-block;
background: #ebebeb;
outline: none;
padding: 25px 50px;
cursor: pointer;
font-weight: 300;
letter-spacing: 0px;
transition: 300ms cubic-bezier(0.2,0.2,0.8,0.8);
color: #4e4e4e;
border-radius: 0px;
:hover {
    background: #e4192f;
    color: #ffffff;
}`
        }
    },
    methods: {
        renderButton() {
            // console.log(buttonElement);
            const domparser = new DOMParser()
            const thing = domparser.parseFromString(this.buttonHTML, 'text/html')
            const thingText = thing.querySelector('button').innerHTML
            console.log(thingText);

            let buttonElement = document.createElement("button");
            buttonElement.innerHTML = thingText;
            document.querySelector('.buttonwrap').appendChild(buttonElement);
        },
    },
    mounted() {
        this.renderButton();
    }
}
</script>

<style lang="scss">
</style>