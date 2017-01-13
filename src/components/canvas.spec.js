import { expect } from "chai";
import jsdom from "jsdom-global"
import Canvas from "./canvas";

describe("Canvas component", function() {
    let canvas, wrapper, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(function() {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => { new Canvas() }).to.not.throw(Error);
    });

    it("has setWidth method, which set width attribute of canvas element", () => {
        canvas = new Canvas();
        const width = 100;

        canvas.setWidth(width);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(width);
    });

    it("has setHeight method, which set height attribute of canvas element", () => {
        canvas = new Canvas();
        const height = 150;

        canvas.setHeight(height);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(height);
    });
});