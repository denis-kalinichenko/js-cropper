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
});