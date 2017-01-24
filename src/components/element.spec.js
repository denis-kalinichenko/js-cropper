import { expect, spy } from "chai";
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
        expect(() => { new Element() }).to.not.throw();
    });

    it("creates element", () => {
        element = new Element();
        const node = element.getNode();
        expect(node.nodeType).to.equal(Node.ELEMENT_NODE);
        expect(node).to.be.an.instanceof(window.HTMLElement);
    });

    it("creates element from existing node", () => {
        const node = document.querySelector(".wrapper");
        element = new Element(node);
        expect(element.getNode().nodeType).to.equal(Node.ELEMENT_NODE);
        expect(element.getNode()).to.be.an.instanceof(window.HTMLElement);
    });

    it("has getNode method, which returns an element's node", () => {
        element = new Element("div");
        expect(element.getNode().nodeType).to.equal(Node.ELEMENT_NODE);
        expect(element.getNode()).to.be.an.instanceof(window.HTMLElement);
    });

    it("properly transforms node argument", () => {
        element = new Element(document.body);
        expect(element.getNode().nodeType).to.equal(Node.ELEMENT_NODE);
        expect(element.getNode()).to.be.an.instanceof(window.HTMLElement);
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
        expect(() => {new Element().render()}).to.throw("Parent node are not passed.");
    });

    it("has setWidth method, which set width attribute of Element before render and return this", () => {
        element = new Element("span");
        const width = 100;

        const resizedElement = element.setWidth(width);
        resizedElement.render(wrapper);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.width).to.equal(width);
        expect(resizedElement).to.equal(element);
    });

    it("has setWidth method, which set width attribute of Element after render and return this", () => {
        element = new Element("span");
        const width = 69;

        element.render(wrapper);
        const resizedElement = element.setWidth(width); 

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.width).to.equal(width);
        expect(resizedElement).to.equal(element);
    });

    it("has setHeight method, which set height attribute of Element before render and return this", () => {
        element = new Element("span");
        const height = 69;

        const resizedElement = element.setHeight(height);
        resizedElement.render(wrapper);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.height).to.equal(height);
        expect(resizedElement).to.equal(element);
    });

    it("has setHeight method, which set height attribute of Element after render and return this", () => {
        element = new Element("span");
        const height = 69;

        element.render(wrapper);
        const resizedElement = element.setHeight(height);

        const elementNode = wrapper.querySelector("span");
        expect(elementNode.height).to.equal(height);
        expect(resizedElement).to.equal(element);
    });

    it("has getContext2d() method, which returns a drawing 2d context on the canvas", () => {
        element = new Element("canvas");
        expect(element.getContext2d).to.be.a("function");

        const getContextSpy = spy();
        HTMLCanvasElement.prototype.getContext = getContextSpy;
        const context = element.getContext2d();
        expect(getContextSpy).to.have.been.called.once.with.exactly("2d");
    });
});