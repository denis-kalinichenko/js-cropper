import { expect } from "chai";
import jsdom from "jsdom-global";
import Image from "./image";
import Frame from "./../objects/frame";
import Size from "./../objects/size";
import Element from "./element";

describe("Image component",() => {
    let image, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new Image()}).to.not.throw();
    });

    it("creates Image element", () => {
        image = new Image();
        expect(image.getNode().nodeType).to.equal(Node.ELEMENT_NODE);
        expect(image.getNode()).to.be.an.instanceof(window.HTMLElement);
    });

    it("has load method, which loads an image by provided URL or path and returns this", () => {
        image = new Image();
        const url = "http://i.imgur.com/4rfBhA4.jpg";
        return image.load(url).then((loadedImage) => {
            expect(loadedImage.getNode().src).to.equal(url);
            expect(loadedImage).to.equal(image);
        });
    });

    it("has isPortrait method, which return true if image format is portrait and return false if not", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);
        expect(image.isPortrait()).to.equal(true);

        image = new Image();
        image.setWidth(600);
        image.setHeight(300);
        expect(image.isPortrait()).to.equal(false);

        image = new Image();
        image.setWidth(600);
        image.setHeight(600);
        expect(image.isPortrait()).to.equal(false);
    });

    it("has isLandscape method, which return true if image format is landscape and return false if not", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);
        expect(image.isLandscape()).to.equal(false);

        image = new Image();
        image.setWidth(600);
        image.setHeight(300);
        expect(image.isLandscape()).to.equal(true);

        image = new Image();
        image.setWidth(600);
        image.setHeight(600);
        expect(image.isLandscape()).to.equal(false);
    });

    it("has isSquare method, which return true if image format is square and return false if not", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);
        expect(image.isSquare()).to.equal(false);

        image = new Image();
        image.setWidth(600);
        image.setHeight(300);
        expect(image.isSquare()).to.equal(false);

        image = new Image();
        image.setWidth(600);
        image.setHeight(600);
        expect(image.isSquare()).to.equal(true);
    });

    it("has scaleToFit method, which scales image for fit to Frame", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);

        const element = new Element();
        element.setWidth(500);
        element.setHeight(300);
        const frame = new Frame();
        frame.update(element.getNode());
        const scale = image.scaleToFit(frame);
        expect(scale).to.equal(0.85);
    });

    it("has scaleToFit method, which scales image for fit to frame even if image is smaller than frame", () => {
        image = new Image();
        image.setWidth(20);
        image.setHeight(30);

        const element = new Element();
        element.setWidth(500);
        element.setHeight(300);
        const frame = new Frame();
        frame.update(element.getNode());
        const scale = image.scaleToFit(frame);
        expect(scale).to.equal(12.75);
    });

    it("has getSize method, which Returns Size object, which contain weight and height", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);

        expect(image.getSize()).to.be.an.instanceOf(Size);
        expect(image.getSize().width).to.equal(image.getNode().width * image._scale);
        expect(image.getSize().height).to.equal(image.getNode().height * image._scale);
    });

    it("has setZoom method, which apply zoom for an image", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);

        expect(image._scale).to.equal(1);
        expect(image._originScale).to.equal(1);
        expect(image._zoom).to.equal(0);

        const zoomValue = 0.5;
        image.setZoom(zoomValue);
        expect(image._scale).to.equal(image._originScale + (image._originScale * zoomValue));
    });

    it("has getZoom method, which return an actual zoom value", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);

        const zoomValue = 0.5;
        image.setZoom(zoomValue);
        expect(image.getZoom()).to.equal(zoomValue);
    });

    it("has getScale method, returns actual scale value", () => {
        image = new Image();
        image.setWidth(300);
        image.setHeight(600);
        image.setZoom(0.5);
        expect(image.getScale()).to.equal(1.5);
    });
});