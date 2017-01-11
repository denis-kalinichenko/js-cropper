import { expect } from "chai";
import jsdom from "jsdom-global";
import Canvas from "./canvas";

describe("Canvas component", function() {
    let canvas;

    beforeEach(() => {
        jsdom();
        canvas = new Canvas();
    });

    afterEach(() => {
        jsdom();
    });

    it("initialises", () => {
        expect(canvas).to.not.equal(undefined);
    });
});