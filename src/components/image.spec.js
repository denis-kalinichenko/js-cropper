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
});