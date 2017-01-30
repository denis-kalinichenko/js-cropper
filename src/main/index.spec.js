import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import ImageCrop from "./index";
import { getContextMock } from "./../../test/mock";

describe("Image Crop component", () => {
    let imageCrop, wrapper, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.id = "image-crop";
        document.body.appendChild(wrapper);
        getContextMock();
    });

    afterEach(function() {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => { new ImageCrop() }).to.not.throw();
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

    it("has loadImage method, which pass Image into Canvas and call draw() method", () => {
        imageCrop = new ImageCrop();
        imageCrop.setHeight(400);
        imageCrop.render(wrapper);

        const setImageSpy = spy();
        const drawSpy = spy();

        imageCrop._canvas = {
            setImage: setImageSpy,
            draw: drawSpy,
        };

        return imageCrop.loadImage("http://i.imgur.com/PJPXonr.jpg").then(() => {
            expect(setImageSpy).to.have.been.called.once.with.exactly(imageCrop._image);
            expect(drawSpy).to.have.been.called.once();
        });
    });

    it("has loadImage method, which throw Error if url or path is invalid or not passed", () => {
        imageCrop = new ImageCrop();
        imageCrop.render(wrapper);

        expect(() => {imageCrop.loadImage()}).to.throw("Image url or path is not passed.");
        expect(() => {imageCrop.loadImage(NaN)}).to.throw("Image url or path is not passed.");
        expect(() => {imageCrop.loadImage(null)}).to.throw("Image url or path is not passed.");
        expect(() => {imageCrop.loadImage(12)}).to.throw("Invalid url or path.");
        expect(() => {imageCrop.loadImage({})}).to.throw("Invalid url or path.");
        expect(() => {imageCrop.loadImage([])}).to.throw("Invalid url or path.");
        expect(() => {imageCrop.loadImage(Infinity)}).to.throw("Invalid url or path.");
        expect(() => {imageCrop.loadImage(true)}).to.throw("Invalid url or path.");
        expect(() => {imageCrop.loadImage(() => {}) }).to.throw("Invalid url or path.");
    });

    it("has getCroppedImage method, which return image as DataURL", () => {
        imageCrop = new ImageCrop();
        imageCrop.setHeight(400);
        imageCrop.setWidth(560);
        imageCrop.render(wrapper);

        const toDataURLSpy = spy();
        imageCrop._canvas.toDataURL = toDataURLSpy;

        const cropedImage = imageCrop.getCroppedImage();
        expect(toDataURLSpy).to.have.been.called.once();
    });

    it("has setZoom method, which set a zoom and return this", () => {
        imageCrop = new ImageCrop();
        imageCrop.setHeight(400);
        imageCrop.setWidth(560);
        imageCrop.render(wrapper);

        const setZoomSpy = spy();
        imageCrop._canvas.setZoom = setZoomSpy;

        const zoomedImage = imageCrop.setZoom(0.5);
        expect(setZoomSpy).to.have.been.called.once.with.exactly(0.5);
        expect(zoomedImage).to.equal(imageCrop);
    });
});