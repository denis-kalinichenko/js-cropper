import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Pattern from "./pattern";
import { ContextMock, getContextCalls } from "./../../test/mock";
import { styles } from "./../config/default";

describe("Pattern component",() => {
    let pattern, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
        Pattern.__Rewire__("Context", ContextMock);
    });

    afterEach(function () {
        cleanJsdom();
        Pattern.__ResetDependency__("Context");
    });

    it("initialises", () => {
        expect(() => {new Pattern()}).to.not.throw();
    });

    it("creates Canvas element", () => {
        pattern = new Pattern();
        expect(pattern.getNode().nodeType).to.equal(Node.ELEMENT_NODE);
        expect(pattern.getNode().nodeName).to.equal("CANVAS");
        expect(pattern.getNode()).to.be.an.instanceof(window.HTMLElement);
    });

    it("has _draw method, which draw the pattern on canvas and return this", () => {
        pattern = new Pattern();
        const dimensions = {
            width: 16,
            height: 16,
        };
        pattern.setWidth(dimensions.width);
        pattern.setHeight(dimensions.height);

        const readyPattern = pattern._draw();
        expect(readyPattern).to.equal(pattern);

        const expectedCalls = [
            { name: 'fillStyle', arguments: [ styles.pattern.fill1 ] },
            { name: 'fillRect', arguments: [ 0, 0, 8, 8 ] },
            { name: 'fillStyle', arguments: [ styles.pattern.fill2 ] },
            { name: 'fillRect', arguments: [ 8, 0, 8, 8 ] },
            { name: 'fillRect', arguments: [ 0, 8, 8, 8 ] },
            { name: 'fillStyle', arguments: [ styles.pattern.fill1 ] },
            { name: 'fillRect', arguments: [ 8, 8, 8, 8 ] },
            { name: 'fillStyle', arguments: [ styles.pattern.fill1 ] },
            { name: 'fillRect', arguments: [ 0, 0, 8, 8 ] },
            { name: 'fillStyle', arguments: [ styles.pattern.fill2 ] },
            { name: 'fillRect', arguments: [ 8, 0, 8, 8 ] },
            { name: 'fillRect', arguments: [ 0, 8, 8, 8 ] },
            { name: 'fillStyle', arguments: [ styles.pattern.fill1 ] },
            { name: 'fillRect', arguments: [ 8, 8, 8, 8 ] }
        ];

        expect(getContextCalls()).to.deep.equal(expectedCalls);
    });
});