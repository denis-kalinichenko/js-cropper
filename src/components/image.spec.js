import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import jsdom from "jsdom-global";
import Image from "./image";

chai.use(chaiAsPromised);

describe("Image component",() => {
    let image, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new Image()}).to.not.throw(Error);
    });

    it("creates Image element", () => {
        image = new Image();
        expect(image.element.nodeType).to.equal(Node.ELEMENT_NODE);
        expect(image.element).to.be.an.instanceof(window.HTMLElement);
    });

    it("has load method, which loads an image by provided URL or path and returns this", () => {
        image = new Image();
        const url = "http://i.imgur.com/4rfBhA4.jpg";
        return image.load(url).then((loadedImage) => {
            expect(loadedImage.element.src).to.equal(url);
            expect(loadedImage).to.equal(image);
        });
    });

    it("has checkFormat method, which check an image format (landscape, portrait or square) and return format", () => {
        image = new Image();
        image.element.width = 300;
        image.element.height = 600;
        expect(image._checkFormat()).to.equal("portrait");

        image = new Image();
        image.element.width = 330;
        image.element.height = 330;
        expect(image._checkFormat()).to.equal("square");

        image = new Image();
        image.element.width = 690;
        image.element.height = 330;
        expect(image._checkFormat()).to.equal("landscape");
    });

    it("has isPortrait method, which return true if image format is portrait and return false if not", () => {
        image = new Image();
        image.element.width = 300;
        image.element.height = 600;
        image._checkFormat();
        expect(image.isPortrait()).to.equal(true);

        image = new Image();
        image.element.width = 600;
        image.element.height = 300;
        image._checkFormat();
        expect(image.isPortrait()).to.equal(false);

        image = new Image();
        image.element.width = 600;
        image.element.height = 600;
        image._checkFormat();
        expect(image.isPortrait()).to.equal(false);
    });

    it("has isLandscape method, which return true if image format is landscape and return false if not", () => {
        image = new Image();
        image.element.width = 300;
        image.element.height = 600;
        image._checkFormat();
        expect(image.isLandscape()).to.equal(false);

        image = new Image();
        image.element.width = 600;
        image.element.height = 300;
        image._checkFormat();
        expect(image.isLandscape()).to.equal(true);

        image = new Image();
        image.element.width = 600;
        image.element.height = 600;
        image._checkFormat();
        expect(image.isLandscape()).to.equal(false);
    });

    it("has isSquare method, which return true if image format is square and return false if not", () => {
        image = new Image();
        image.element.width = 300;
        image.element.height = 600;
        image._checkFormat();
        expect(image.isSquare()).to.equal(false);

        image = new Image();
        image.element.width = 600;
        image.element.height = 300;
        image._checkFormat();
        expect(image.isSquare()).to.equal(false);

        image = new Image();
        image.element.width = 600;
        image.element.height = 600;
        image._checkFormat();
        expect(image.isSquare()).to.equal(true);
    });
});