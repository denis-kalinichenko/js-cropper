import { expect } from "chai";
import jsdom from "jsdom-global";
import { validateNode } from "./validators";

describe("Validators",() => {
    beforeEach(function() {
        this.jsdom = jsdom();
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(function() {
        this.jsdom();
    });

    describe("Node validator", () => {
        it("returns a DOM element", () => {
            expect(validateNode(".wrapper").nodeType).to.be.equal(Node.ELEMENT_NODE);
            expect(validateNode(document.querySelector(".wrapper")).nodeType).to.be.equal(Node.ELEMENT_NODE);
        });

        it("throws Error if selector is invalid or not passed", () => {
            expect(() => {validateNode()}).to.throw("Node is not passed.");
            expect(() => {validateNode(".fake")}).to.throw("Invalid selector.");
            expect(() => {validateNode({})}).to.throw("Node should be instance of window.HTMLElement or valid selector string.");
            expect(() => {validateNode([])}).to.throw("Node should be instance of window.HTMLElement or valid selector string.");
            expect(() => {validateNode(1)}).to.throw("Node should be instance of window.HTMLElement or valid selector string.");
            expect(() => {validateNode(Infinity)}).to.throw("Node should be instance of window.HTMLElement or valid selector string.");
            expect(() => {validateNode(true)}).to.throw("Node should be instance of window.HTMLElement or valid selector string.");
            expect(() => {validateNode(() => {}) }).to.throw("Node should be instance of window.HTMLElement or valid selector string.");
        });
    });
});