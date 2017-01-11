import { expect } from "chai";
import jsdom from "jsdom-global";
import Canvas from "./canvas";

describe("Canvas component", function() {
    let canvas, wrapper;

    beforeEach(() => {
        jsdom();
        canvas = new Canvas();

        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(() => {
        jsdom();
    });

    it("initialises", () => {
        expect(canvas).to.not.equal(undefined);
    });

    it("has setWidth and setHeight methods, which sets width and height style properties to canvas element", () => {
        let width = 100;
        let height = 150;

        canvas.setWidth(width);
        canvas.setHeight(height);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.style.width).to.equal(`${width}px`);
        expect(canvasNode.style.height).to.equal(`${height}px`);
    });

    it("throws Error if width property is invalid or not passed", () => {
        expect(() => {canvas.setWidth()}).to.throw("Width is not passed.");
        expect(() => {canvas.setWidth("string")}).to.throw("Invalid width.");
        expect(() => {canvas.setWidth({})}).to.throw("Invalid width.");
        expect(() => {canvas.setWidth([])}).to.throw("Invalid width.");
        expect(() => {canvas.setWidth(Infinity)}).to.throw("Invalid width.");
        expect(() => {canvas.setWidth(true)}).to.throw("Invalid width.");
        expect(() => {canvas.setWidth(() => {}) }).to.throw("Invalid width.");
    });

    it("throws Error if height property is invalid or not passed", () => {
        expect(() => {canvas.setHeight()}).to.throw("Height is not passed.");
        expect(() => {canvas.setHeight("string")}).to.throw("Invalid height.");
        expect(() => {canvas.setHeight({})}).to.throw("Invalid height.");
        expect(() => {canvas.setHeight([])}).to.throw("Invalid height.");
        expect(() => {canvas.setHeight(Infinity)}).to.throw("Invalid height.");
        expect(() => {canvas.setHeight(true)}).to.throw("Invalid height.");
        expect(() => {canvas.setHeight(() => {}) }).to.throw("Invalid height.");
    });
});