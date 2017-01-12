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
        return image.load("http://i.imgur.com/4rfBhA4.jpg").then((loadedImage) => {
            expect(loadedImage.element.width).to.equal(624);
            expect(loadedImage.element.height).to.equal(929);
            expect(loadedImage).to.equal(image);
        });
    });

    it("", () => {
        image = new Image();
        return expect(image.load("https://g2a.com/fakeimage.jpg")).to.eventually.be.rejectedWith("Can't load an image.").and.be.an.instanceOf(Error);
    });
});