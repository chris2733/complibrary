<template>
    <figure>
        <canvas id="bezierCanvasGen"></canvas>
        <figcaption id="labelFontSize">
            <div class="speedslider">
                <label for="speedSlider">Animation Speed:</label>
                <input
                    type="range"
                    id="speedSlider"
                    min="100"
                    max="1500"
                    value="90"
                    step="10"
                />
                <span id="speedSliderVal">90</span>
            </div>
            <p>Cubic Bezier:</p>
            <span id="currentEasingP1"></span>,
            <span id="currentEasingP2"></span>,
            <span id="currentEasingP3"></span>,
            <span id="currentEasingP4"></span>
            <span id="transitionDemo"> hover </span>
            <div class="presetBezier">
                Choose a preset:
                <select name="" id="presetBezierSelect">
                    <option value="[0.12, 0, 0.39, 0]">easeInSine</option>
                    <option value="[0.61, 1, 0.88, 1]">easeOutSine</option>
                    <option value="[0.37, 0, 0.63, 1]">easeInOutSine</option>
                    <option value="[0.11, 0, 0.5, 0]">easeInQuad</option>
                    <option value="[0.5, 1, 0.89, 1]">easeOutQuad</option>
                    <option value="[0.45, 0, 0.55, 1]">easeInOutQuad</option>
                    <option value="[0.32, 0, 0.67, 0]">easeInCubic</option>
                    <option value="[0.33, 1, 0.68, 1]">easeOutCubic</option>
                    <option value="[0.65, 0, 0.35, 1]">easeInOutCubic</option>
                    <option value="[0.5, 0, 0.75, 0]">easeInQuart</option>
                    <option value="[0.25, 1, 0.5, 1]">easeOutQuart</option>
                    <option value="[0.76, 0, 0.24, 1]">easeInOutQuart</option>
                    <option value="[0.64, 0, 0.78, 0]">easeInQuint</option>
                    <option value="[0.22, 1, 0.36, 1]">easeOutQuint</option>
                    <option value="[0.83, 0, 0.17, 1]">easeInOutQuint</option>
                    <option value="[0.7, 0, 0.84, 0]">easeInExpo</option>
                    <option value="[0.16, 1, 0.3, 1]">easeOutExpo</option>
                    <option value="[0.87, 0, 0.13, 1]">easeInOutExpo</option>
                    <option value="[0.55, 0, 1, 0.45]">easeInCirc</option>
                    <option value="[0, 0.55, 0.45, 1]">easeOutCirc</option>
                    <option value="[0.85, 0, 0.15, 1]">easeInOutCirc</option>
                    <option value="[0.36, 0, 0.66, -0.56]">easeInBack</option>
                    <option value="[0.34, 1.56, 0.64, 1]">easeOutBack</option>
                    <option value="[0.68, -0.6, 0.32, 1.6]">
                        easeInOutBack
                    </option>
                </select>
            </div>
        </figcaption>
    </figure>
</template>


<script>
export default {
    data() {
        return {

        };
    },
    methods: {

    },
    mounted() {
        
    }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes changewidth {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

figure {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    canvas {
        margin: 0;
        padding: 0;
    }
    .canvasBezier {
        position: absolute;
        left: 50%;
        transform: translate(50%,-50%);
        top: 50%;
    }
    #labelFontSize {
        padding: 0 0 0 30px;
        p {
            margin: 0;
        }
        .speedslider {
            margin: 0 0 15px 0;
            label {
                display: block;
            }
        }
        #transitionDemo {
            display: block;
            position: relative;
            padding: 10px 80px;
            border: 1px solid rgba(0,0,0,0.4);
            border-radius: 8px;
            text-transform: uppercase;
            overflow: hidden;
            margin: 15px 0;
            letter-spacing: 1px;
            font-size: 14px;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 0;
                background: #48bfe3;
                transition: inherit;
            }
            &:hover {
                color: rgba(0,0,0,0);
                &::before {
                    width: 100%;
                }
            }
        }
    }
}
</style>
