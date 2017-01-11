import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import ImageCrop from "./index";

describe("Image Crop component", () => {
    let imageCrop, wrapper;

    beforeEach(() => {
        jsdom();
        imageCrop = new ImageCrop();
        wrapper = document.createElement("div");
        wrapper.id = "image-crop";
        document.body.appendChild(wrapper);
    });

    afterEach(() => {
        jsdom();
    });

    it("has render method, which renders Canvas element and returns this", () => {
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
        expect(canvasNode.style.width).to.equal(`${config.width}px`);
        expect(canvasNode.style.height).to.equal(`${config.height}px`);
    });

    it("has setWidth method, which changes width style property of Canvas container and returns this", () => {
        expect(imageCrop.setWidth).to.be.a("function");

        imageCrop = new ImageCrop({ width: 400 });
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.style.width).to.equal("400px");

        const resizedImageCrop = imageCrop.setWidth(600);
        expect(canvasNode.style.width).to.equal("600px");

        expect(resizedImageCrop).to.equal(imageCrop);
    });

    it("throws Error if value is not passed to setWidth method", () => {
        expect(() => {
            imageCrop.setWidth()
        }).to.throw("Width is not passed.");
    });

    it("has setHeight method, which changes height style property of Canvas container and returns this", () => {
        expect(imageCrop.setHeight).to.be.a("function");

        imageCrop = new ImageCrop({ height: 123 });
        imageCrop.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.style.height).to.equal("123px");

        const resizedImageCrop = imageCrop.setHeight(321);
        expect(canvasNode.style.height).to.equal("321px");

        expect(resizedImageCrop).to.equal(imageCrop);
    });

    it("throws Error if value is not passed to setHeight method", () => {
        expect(() => {
            imageCrop.setHeight()
        }).to.throw("Height is not passed.");
    });
});