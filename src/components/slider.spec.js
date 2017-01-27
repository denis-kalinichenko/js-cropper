import { expect } from "chai";
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
        expect(slider.getNode().outerHTML).to.equal(`<input type="range" class="slider">`);
    });
});