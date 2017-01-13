import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import ImageCrop from "./index";

describe("Image Crop component", () => {
    let imageCrop, wrapper, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.id = "image-crop";
        document.body.appendChild(wrapper);
    });

    afterEach(function() {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => { new ImageCrop() }).to.not.throw(Error);
    });

    it("has render method, which renders Canvas element and returns this", () => {
        imageCrop = new ImageCrop();
        const wrapper = document.querySelector("#image-crop");
        expect(imageCrop.render).to.be.a("function");

        const renderedImageCrop = imageCrop.render(wrapper);

        const canvas = wrapper.querySelectorAll("canvas");
        expect(canvas).to.have.length(1);

        expect(renderedImageCrop).to.equal(imageCrop);
    });

    it("properly transforms width, height parameters from config", () => {
        const config = {
            width: 400,
            height: 400
        };
        imageCrop = new ImageCrop(config);
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(config.width);
        expect(canvasNode.height).to.equal(config.height);
    });

    it("has setWidth method, which changes width style property of Canvas container and returns this", () => {
        imageCrop = new ImageCrop({ width: 400 });
        expect(imageCrop.setWidth).to.be.a("function");
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(400);

        const resizedImageCrop = imageCrop.setWidth(600);
        expect(canvasNode.width).to.equal(600);

        expect(resizedImageCrop).to.equal(imageCrop);
    });

    it("has setWidth method, which changes width style property of Canvas container before render()", () => {
        imageCrop = new ImageCrop();
        imageCrop.setWidth(400);
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(400);
    });

    it("has setHeight method, which changes height attribute of Canvas container and returns this", () => {
        imageCrop = new ImageCrop({ height: 123 });
        expect(imageCrop.setHeight).to.be.a("function");
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(123);

        const resizedImageCrop = imageCrop.setHeight(321);
        expect(canvasNode.height).to.equal(321);

        expect(resizedImageCrop).to.equal(imageCrop);
    });

    it("has setHeight method, which changes width attribute of Canvas container before render()", () => {
        imageCrop = new ImageCrop();
        imageCrop.setHeight(400);
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(400);
    });
});