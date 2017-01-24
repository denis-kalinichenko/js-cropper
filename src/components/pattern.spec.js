import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Pattern from "./pattern";

describe("Pattern component",() => {
    let pattern, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
    });

    afterEach(function () {
        cleanJsdom();
    });

    it("initialises", () => {
        Pattern.prototype.getContext2d = () => {
            return {
                fillRect: () => {},
            };
        };
        expect(() => {new Pattern()}).to.not.throw();
    });

    it("creates Canvas element", () => {
        pattern = new Pattern();
        expect(pattern.getNode().nodeType).to.equal(Node.ELEMENT_NODE);
        expect(pattern.getNode().nodeName).to.equal("CANVAS");
        expect(pattern.getNode()).to.be.an.instanceof(window.HTMLElement);
    });

    it("has _draw method, which draw the pattern on canvas and return this", () => {
        const fillRectSpy = spy();
        Pattern.prototype.getContext2d = () => {
            return {
                fillRect: fillRectSpy,
            }
        };

        pattern = new Pattern();
        const dimensions = {
            width: 16,
            height: 16,
        };
        pattern.setWidth(dimensions.width);
        pattern.setHeight(dimensions.height);

        const readyPattern = pattern._draw();
        expect(readyPattern).to.equal(pattern);
        expect(fillRectSpy).to.have.been.called.with.exactly(0, 0, 8, 8);
        expect(fillRectSpy).to.have.been.called.with.exactly(8, 0, 8, 8);
        expect(fillRectSpy).to.have.been.called.with.exactly(0, 8, 8, 8);
        expect(fillRectSpy).to.have.been.called.with.exactly(8, 8, 8, 8);
    });
});