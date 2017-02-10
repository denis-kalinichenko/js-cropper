import { expect, spy } from "chai";
import jsdom from "jsdom-global";
import Cutout from "./cutout";
import {styles} from "./../config/default";
import { ContextMock, getContextCalls, FrameMock, CanvasMock } from "./../../test/mock";

describe("Cutout component",() => {
    let cutout, cleanJsdom;

    beforeEach(function() {
        cleanJsdom = jsdom();
        Cutout.__Rewire__("Context", ContextMock);
    });

    afterEach(function() {
        cleanJsdom();
        Cutout.__ResetDependency__("Context");
    });

    it("initialises", () => {
        expect(() => {
            new Cutout(new FrameMock(), new CanvasMock())
        }).to.not.throw();
    });

    it("has draw method, which draw the cutout over canvas", () => {
        cutout = new Cutout(new FrameMock(), new CanvasMock());
        cutout.draw();

        const expectedCalls = [
            { name: 'fillStyle', arguments: [ styles.cutout.fill ] },
            { name: 'beginPath', arguments: [] },
            { name: 'rect', arguments: [ 0, 0, 300, 150 ] },
            { name: 'moveTo', arguments: [ 135.5, 25.5 ] },
            { name: 'lineTo', arguments: [ 135.5, 314.5 ] },
            { name: 'lineTo', arguments: [ 424.5, 314.5 ] },
            { name: 'lineTo', arguments: [ 424.5, 25.5 ] },
            { name: 'closePath', arguments: [] },
            { name: 'fill', arguments: [] }
        ];
        expect(getContextCalls()).to.deep.equal(expectedCalls);
    });
});
