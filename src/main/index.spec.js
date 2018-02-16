import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Cropper from "./index";
import { CanvasMock, getCanvasCalls } from "./../../test/mock";

describe("Cropper component", () => {
    let imageCrop, wrapper, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.id = "image-crop";
        document.body.appendChild(wrapper);
        Cropper.__Rewire__("Canvas", CanvasMock);
    });

    afterEach(function() {
        cleanJsdom();
        Cropper.__ResetDependency__("Canvas");
    });

    it("initialises", () => {
        expect(() => { new Cropper() }).to.not.throw();
    });

    it("has render method, which renders Canvas element and returns this", () => {
        imageCrop = new Cropper();
        const wrapper = document.querySelector("#image-crop");
        expect(imageCrop.render).to.be.a("function");

        const renderedImageCrop = imageCrop.render(wrapper);

        expect(wrapper.querySelectorAll(".image-crop")).to.have.length(1);
        expect(wrapper.querySelectorAll(".image-crop-tools")).to.have.length(1);
        expect(wrapper.querySelectorAll(".image-crop-zoom")).to.have.length(1);
        expect(wrapper.querySelectorAll("svg.icon.icon-frame-landscape")).to.have.length(2);

        const expectedCanvasCalls = [
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'setHeight', arguments: [ 340 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCanvasCalls);
        expect(renderedImageCrop).to.equal(imageCrop);
    });

    it("properly transforms width, height parameters from config", () => {
        const config = {
            width: 400,
            height: 400
        };
        imageCrop = new Cropper(config);
        imageCrop.render(wrapper);

        const expectedCanvasCalls = [
            { name: 'setWidth', arguments: [ 400 ] },
            { name: 'setHeight', arguments: [ 400 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCanvasCalls);
    });

    it("properly transforms onChange callback from config", () => {
        const onChangeFunc = spy();
        const config = {
            width: 400,
            height: 400,
            onChange: onChangeFunc
        };
        imageCrop = new Cropper(config);
        imageCrop.render(wrapper);
        expect(onChangeFunc).to.have.been.called.once.with.exactly(imageCrop);
    });

    it("has setWidth method, which changes width style property of Canvas container and returns this", () => {
        imageCrop = new Cropper({ width: 400 });
        expect(imageCrop.setWidth).to.be.a("function");
        imageCrop.render(wrapper);

        let expectedCanvasCalls = [
            { name: 'setWidth', arguments: [ 400 ] },
            { name: 'setHeight', arguments: [ 340 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCanvasCalls);

        const resizedImageCrop = imageCrop.setWidth(600);
        expectedCanvasCalls = [
            { name: 'setWidth', arguments: [ 400 ] },
            { name: 'setHeight', arguments: [ 340 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] },
            { name: 'setWidth', arguments: [ 600 ]  }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCanvasCalls);

        expect(resizedImageCrop).to.equal(imageCrop);
    });

    it("has setHeight method, which changes height attribute of Canvas container and returns this", () => {
        imageCrop = new Cropper({ height: 123 });
        expect(imageCrop.setHeight).to.be.a("function");
        imageCrop.render(wrapper);

        let expectedCanvasCalls = [
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'setHeight', arguments: [ 123 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCanvasCalls);

        const resizedImageCrop = imageCrop.setHeight(321);
        expectedCanvasCalls = [
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'setHeight', arguments: [ 123 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] },
            { name: 'setHeight', arguments: [ 321 ]  }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCanvasCalls);
        expect(resizedImageCrop).to.equal(imageCrop);
    });

    it("has loadImage method, which pass Image into Canvas and call draw() method", () => {
        imageCrop = new Cropper();
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

    it("resets zoom slider after passing new image", () => {
        imageCrop = new Cropper();
        imageCrop.setHeight(400);
        imageCrop.render(wrapper);
        imageCrop.setZoom(0.5);
        expect(Number(wrapper.querySelector("input.slider").value)).to.equal(50);

        return imageCrop.loadImage("http://i.imgur.com/PJPXonr.jpg").then(() => {
            expect(Number(wrapper.querySelector("input.slider").value)).to.equal(0);
        });
    });

    it("has loadImage method, which throw Error if url or path is invalid or not passed", () => {
        imageCrop = new Cropper();
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
        imageCrop = new Cropper();
        imageCrop.setHeight(400);
        imageCrop.setWidth(560);
        imageCrop.render(wrapper);

        const toDataURLSpy = spy();
        imageCrop._canvas.toDataURL = toDataURLSpy;

        const cropedImage = imageCrop.getCroppedImage();
        expect(toDataURLSpy).to.have.been.called.once();
    });

    it("has setZoom method, which set a zoom and return this", () => {
        imageCrop = new Cropper();
        imageCrop.setHeight(400);
        imageCrop.setWidth(560);
        imageCrop.render(wrapper);

        const setZoomSpy = spy();

        const zoomedImage = imageCrop.setZoom(0.5);

        const expectedCalls = [
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'setHeight', arguments: [ 340 ] },
            { name: 'setHeight', arguments: [ 400 ] },
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] },
            { name: 'setZoom', arguments: [ 0.5 ] }
        ];

        expect(getCanvasCalls()).to.deep.equal(expectedCalls);
        expect(zoomedImage).to.equal(imageCrop);
    });

    it("has reset method, which resets zoom and image position", () => {
        imageCrop = new Cropper();
        imageCrop.setHeight(400);
        imageCrop.setWidth(560);
        imageCrop.render(wrapper);

        const resetedCrop = imageCrop.reset();

        const expectedCalls = [
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'setHeight', arguments: [ 340 ] },
            { name: 'setHeight', arguments: [ 400 ] },
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] },
            { name: 'setZoom', arguments: [ 0 ] }
        ];
        expect(getCanvasCalls()).to.deep.equal(expectedCalls);
        expect(resetedCrop).to.equal(imageCrop);
    });

    it("has getData method, which returns current frame position on image in full size", () => {
        imageCrop = new Cropper();
        imageCrop.render(wrapper);
        const expectedData = {
            origin: { x: 234.42906574394465, y: 44.117647058823536 },
            size: { width: 500, height: 500 },
        };
        expect(imageCrop.getData()).to.deep.equal(expectedData);
    });

    it("has setData method, which sets a frame origin and size relative to an Image", () => {
        imageCrop = new Cropper();
        imageCrop.render(wrapper);
        const data = {
            origin: { x: 234.42906574394465, y: 44.117647058823536 },
            size: { width: 500, height: 500 },
        };
        const expectedCalls = [
            { name: 'setWidth', arguments: [ 560 ] },
            { name: 'setHeight', arguments: [ 340 ] },
            { name: 'render', arguments: [ wrapper.querySelector(".image-crop") ] },
            { name: 'setData', arguments: [ data ] }
        ];

        imageCrop.setData(data);
        expect(Number(document.querySelector(".slider").value)).to.equal(70);
        expect(getCanvasCalls()).to.deep.equal(expectedCalls);
    });
});