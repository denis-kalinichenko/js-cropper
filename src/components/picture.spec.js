import { expect } from "chai";
import jsdom from "jsdom-global";
import Picture from "./picture";

describe("Picture component",() => {
    let picture, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {new Picture()}).to.not.throw(Error);
    });

    it("properly transforms tag argument and creates Image element", () => {
        picture = new Picture();
        expect(picture.element.nodeType).to.equal(Node.ELEMENT_NODE);
        expect(picture.element).to.be.an.instanceof(window.HTMLElement);
    });
});