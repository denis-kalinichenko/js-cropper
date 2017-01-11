import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import ImageCrop from "./index";

describe("Image Crop component", () => {
    beforeEach(() => {
        jsdom();
        const wrapper = document.createElement("div");
        wrapper.id = "image-crop";
        document.body.appendChild(wrapper);
    });

    afterEach(() => {
        jsdom();
    });

    it("has render method, which renders Canvas element and returns this", () => {
        const imageCrop = new ImageCrop();
        const wrapper = document.querySelector("#image-crop");
        expect(imageCrop.render).to.be.a("function");

        const renderedImageCrop = imageCrop.render(wrapper);

        const canvas = wrapper.querySelectorAll("canvas");
        expect(canvas).to.have.length(1);

        expect(renderedImageCrop).to.equal(imageCrop);
    });
});