import { expect } from "chai";
import jsdom from "jsdom-global";
import { validateNode, validateConfig } from "./validators";

describe("Validators",() => {
    beforeEach(() => {
         jsdom();
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(() => {
        jsdom();
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

    describe("Config validator", () => {
        it("processes passed config and returns valid full config as object", () => {
            expect(validateConfig).to.be.a("function");

            let expectedConfig = {
                width: 300,
                height: 300
            };

            let config = {
                foo: "bar"
            };
            expect(validateConfig(config)).to.deep.equal(expectedConfig);

            config = {};
            expect(validateConfig(config)).to.deep.equal(expectedConfig);

            config = {
                width: 600,
            };
            expectedConfig = {
                width: 600,
                height: 300
            };
            expect(validateConfig(config)).to.deep.equal(expectedConfig);
        });

        it("throws Error if config is invalid or not passed", () => {
            expect(() => {validateConfig()}).to.throw("Config is not passed.");
            expect(() => {validateConfig("string")}).to.throw("Invalid config.");
            expect(() => {validateConfig([])}).to.throw("Invalid config.");
            expect(() => {validateConfig(1)}).to.throw("Invalid config.");
            expect(() => {validateConfig(Infinity)}).to.throw("Invalid config.");
            expect(() => {validateConfig(true)}).to.throw("Invalid config.");
            expect(() => {validateConfig(() => {}) }).to.throw("Invalid config.");
        });
    });
});