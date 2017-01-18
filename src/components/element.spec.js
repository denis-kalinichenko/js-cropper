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

    it("initialises", () => {
        expect(() => { new Element() }).to.not.throw(Error);
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
        expect(wrapper.querySelectorAll("input")).to.have.length(0);
        renderedElement = element.render(wrapper);
        expect(wrapper.querySelectorAll("input")).to.have.length(1);
        expect(renderedElement).to.equal(element);
    });

    it("has render method, which throws Error if parent node are not passed", () => {
        element = new Element();
        expect(() => {new Element().render()}).to.throw("Parent node are not passed.");
    });

    it("has setWidth method, which set width attribute of canvas element before render and return this", () => {
        element = new Element("span");
        const width = 100;

        const resizedElement = element.setWidth(width);
        resizedElement.render(wrapper);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.width).to.equal(width);
        expect(resizedElement).to.equal(element);
    });

    it("has setWidth method, which set width attribute of canvas element after render and return this", () => {
        element = new Element("span");
        const width = 69;

        element.render(wrapper);
        const resizedElement = element.setWidth(width);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.width).to.equal(width);
        expect(resizedElement).to.equal(element);
    });

    it("has setHeight method, which set height attribute of canvas element before render and return this", () => {
        element = new Element("span");
        const height = 69;

        const resizedElement = element.setHeight(height);
        resizedElement.render(wrapper);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.height).to.equal(height);
        expect(resizedElement).to.equal(element);
    });

    it("has setHeight method, which set height attribute of canvas element after render and return this", () => {
        element = new Element("span");
        const height = 69;

        element.render(wrapper);
        const resizedElement = element.setHeight(height);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.height).to.equal(height);
        expect(resizedElement).to.equal(element);
    });
});