import { expect } from "chai";
import jsdom from "jsdom-global";
import Icon from "./icon";
import Element from "./element";

describe("Icon component",() => {
    let cleanJsdom, wrapper;

    beforeEach(function () {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        expect(() => {
            new Icon()
        }).to.not.throw();
        expect(new Icon).to.be.an.instanceOf(Element);
    });

    it("has redner method, which render an icon", () => {
        const icon = new Icon("frame-landscape");
        icon.render(wrapper);
        expect(icon.render).to.be.a("function");
        expect(wrapper.innerHTML).to.equal(`<svg class="icon icon-frame-landscape"><use xlink:href="#icon-frame-landscape"></use></svg>`);
    });
});