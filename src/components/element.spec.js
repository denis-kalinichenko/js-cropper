import { expect } from "chai";
import jsdom from "jsdom-global";
import Element from "./element";

describe("Base element component",() => {
    let element, wrapper, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(function() {
        cleanJsdom();
    });

    it("properly transforms tag argument and creates element", () => {
        element = new Element();
        expect(element.element.nodeType).to.equal(Node.ELEMENT_NODE);
        expect(element.element).to.be.an.instanceof(window.HTMLElement);
    });

    it("has render method, which renders element and returns this", () => {
        element = new Element();
        expect(element.render).to.be.a("function");

        expect(wrapper.querySelectorAll("div")).to.have.length(0);
        element = new Element();
        let renderedElement = element.render(wrapper);
        expect(wrapper.querySelectorAll("div")).to.have.length(1);
        expect(renderedElement).to.equal(element);

        element = new Element("div");
        renderedElement = element.render(wrapper);
        expect(wrapper.querySelectorAll("div")).to.have.length(2);
        expect(renderedElement).to.equal(element);

        element = new Element("span");
        expect(wrapper.querySelectorAll("span")).to.have.length(0);
        renderedElement = element.render(wrapper);
        expect(wrapper.querySelectorAll("span")).to.have.length(1);
        expect(renderedElement).to.equal(element);

        element = new Element("a");
        expect(wrapper.querySelectorAll("a")).to.have.length(0);
        renderedElement = element.render(wrapper);
        expect(wrapper.querySelectorAll("a")).to.have.length(1);
        expect(renderedElement).to.equal(element);

        element = new Element("input");
        renderedElement = element.render(wrapper);
        expect(wrapper.querySelectorAll("input")).to.have.length(1);
        expect(renderedElement).to.equal(element);
    });

    it("has render method, which throws Error if parent node are not passed", () => {
        element = new Element();
        expect(() => {new Element().render()}).to.throw("Parent node are not passed.");
    });
});