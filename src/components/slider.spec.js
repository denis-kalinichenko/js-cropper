import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Slider from "./slider";
import Element from "./element";

describe("Slider component",() => {
    let cleanJsdom, wrapper;

    beforeEach(function () {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new Slider()}).to.not.throw();
        expect(new Slider).to.be.an.instanceOf(Element);
    });

    it("has redner method, which render a slider", () => {
        const slider = new Slider();
        slider.render(wrapper);
        expect(slider.render).to.be.a("function");
        expect(slider.getNode().outerHTML).to.equal(`<input type="range" class="slider" min="0" max="100" value="0">`);
    });

    it("has onChange method, which fires after value change and returns a value from 0 to 100", () => {
        const slider = new Slider();
        slider.render(wrapper);

        const onChangeSpy = spy();
        const expectedValue = 80;

        slider.onChange(onChangeSpy);
        const input = document.querySelector("input");
        input.value = expectedValue;

        const event = new Event("change");
        input.dispatchEvent(event);
        expect(onChangeSpy).to.have.been.called.once.with.exactly(expectedValue);
    });

    it("has setValue method, which sets a value", () => {
        const slider = new Slider();
        slider.setValue(60);
        expect(Number(slider.getNode().value)).to.equal(60);
    });
});