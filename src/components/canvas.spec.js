import {expect, spy} from "chai";
import jsdom from "jsdom-global"
import Canvas from "./canvas";
import Image from "./image";
import Point from "./../objects/point";
import { ContextMock, getContextCalls, PatternMock, FrameMock, CutoutMock, GeneratorMock, getNodes } from "./../../test/mock";

describe("Canvas component", function () {
    let canvas, wrapper, cleanJsdom;

    beforeEach(function () {
        cleanJsdom = jsdom();
        wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        document.body.appendChild(wrapper);

        Canvas.__Rewire__("Context", ContextMock);
        Canvas.__Rewire__("Pattern", PatternMock);
        Canvas.__Rewire__("Frame", FrameMock);
        Canvas.__Rewire__("Cutout", CutoutMock);
        Canvas.__Rewire__("Generator", GeneratorMock);
    });

    afterEach(function () {
        cleanJsdom();
        Canvas.__ResetDependency__("Context");
        Canvas.__ResetDependency__("Pattern");
        Canvas.__ResetDependency__("Frame");
        Canvas.__ResetDependency__("Cutout");
        Canvas.__ResetDependency__("Generator");
    });

    it("initialises", () => {
        expect(() => {
            new Canvas()
        }).to.not.throw();
    });

    it("has render method, which draws background pattern, call render() method from Element class and return this", () => {
        canvas = new Canvas();
        expect(canvas.render).to.be.a("function");

        const drawBackgroundSpy = spy();
        canvas._drawBackground = drawBackgroundSpy;

        let renderedCanvas = canvas.render(wrapper);
        expect(wrapper.querySelectorAll("canvas")).to.have.length(1);
        expect(drawBackgroundSpy).to.have.been.called.once();
        expect(renderedCanvas).to.equal(canvas);
    });

    it("has setWidth method, which set width attribute of canvas element", () => {
        canvas = new Canvas();
        const width = 100;

        canvas.setWidth(width);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.width).to.equal(width);
    });

    it("has setHeight method, which set height attribute of canvas element", () => {
        canvas = new Canvas();
        const height = 150;

        canvas.setHeight(height);
        canvas.render(wrapper);

        const canvasNode = wrapper.querySelector("canvas");
        expect(canvasNode.height).to.equal(height);
    });

    it("has setImage method, which pass the Image object into Canvas, reset points, call scaleToFit() and returns this", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        const image = new Image();
        image.setWidth(300);
        image.setHeight(300);
        expect(canvas.setImage).to.be.a("function");

        const resetPointSpy = spy();
        canvas._resetPoints = resetPointSpy;

        const scaleToFitSpy = spy();
        image.scaleToFit = scaleToFitSpy;

        canvas.setImage(image);
        expect(canvas._image).to.equal(image);
        expect(resetPointSpy).to.have.been.called.once();
        expect(scaleToFitSpy).to.have.been.called.once.with.exactly(canvas._frame);
    });

    it("has _resetPoints method, which set to zero points", () => {
        canvas = new Canvas();
        canvas.render(wrapper);

        canvas._lastPoint = new Point(69, 69);
        canvas._basePoint = new Point(69, 69);

        canvas._resetPoints();
        expect(canvas._lastPoint.x).to.equal(0);
        expect(canvas._lastPoint.y).to.equal(0);
        expect(canvas._basePoint.x).to.equal(0);
        expect(canvas._basePoint.y).to.equal(0);
    });

    it("has draw method, which draws Image Crop on canvas", () => {
        canvas = new Canvas();
        canvas.setWidth(300);
        canvas.setHeight(300);

        canvas.render(wrapper);

        let image = new Image();
        image.getNode().width = 1000;
        image.getNode().height = 500;
        canvas.setImage(image);
        const drawedCanvas = canvas.draw();

        const expectedCalls = [
            { name: 'createPattern', arguments: [ getNodes().pattern, 'repeat' ] },
            { name: 'rect', arguments: [ 0, 0, 300, 300 ] },
            { name: 'fillStyle', arguments: [ {} ] },
            { name: 'fill', arguments: [] },
            { name: 'clearRect', arguments: [ 0, 0, 300, 300 ] },
            { name: 'createPattern', arguments: [ getNodes().pattern, 'repeat' ] },
            { name: 'rect', arguments: [ 0, 0, 300, 300 ] },
            { name: 'fillStyle', arguments: [ {} ] },
            { name: 'fill', arguments: [] },
            { name: 'drawImage', arguments: [ image.getNode(), -9, 25.5, 578, 289 ]}
        ];

        expect(getContextCalls()).to.deep.equal(expectedCalls);
        expect(drawedCanvas).to.equal(canvas);
    });

    it("has clear method, which clear canvas 2d context and return this", () => {
        canvas = new Canvas();
        const dimensions = {
            width: 500,
            height: 300,
        };
        canvas.setWidth(dimensions.width);
        canvas.setHeight(dimensions.height);

        const expectedCalls = [
            { name: 'clearRect', arguments: [ 0, 0, dimensions.width, dimensions.height ] }
        ];

        const clearedCanvas = canvas.clear();
        expect(clearedCanvas).to.equal(canvas);
        expect(getContextCalls()).to.deep.equal(expectedCalls);
    });

    it("has toDataURL method, which return image as DataURL", () => {
        canvas = new Canvas();
        canvas.setHeight(400);
        canvas.setWidth(560);
        canvas.render(wrapper);

        const toDataURLSpy = spy();
        canvas._generator.toDataURL = toDataURLSpy;
        const dataURL = canvas.toDataURL();
        expect(toDataURLSpy).to.have.been.called.once();
    });

    it("has setZoom method, which sets zoom and return this", () => {
        canvas = new Canvas();
        canvas.setHeight(340);
        canvas.setWidth(560);
        canvas.render(wrapper);

        const image = new Image();
        image.getNode().width = 500;
        image.getNode().height = 400;

        canvas.setImage(image);

        const expectedCalls = [
            { name: 'createPattern', arguments: [ getNodes().pattern, 'repeat' ] },
            { name: 'rect', arguments: [ 0, 0, 560, 340 ] },
            { name: 'fillStyle', arguments: [ {} ] },
            { name: 'fill', arguments: [] },
            { name: 'clearRect', arguments: [ 0, 0, 560, 340 ] },
            { name: 'createPattern', arguments: [ getNodes().pattern, 'repeat' ] },
            { name: 'rect', arguments: [ 0, 0, 560, 340 ] },
            { name: 'fillStyle', arguments: [ {} ] },
            { name: 'fill', arguments: [] },
            { name: 'drawImage', arguments: [ image.getNode(), -90.3125, -72.25, 541.875, 433.5 ] }
        ];

        const zoomedCanvas = canvas.setZoom(0.5);
        expect(zoomedCanvas).to.equal(canvas);
        expect(getContextCalls()).to.deep.equal(expectedCalls);
    });

    it("properly transforms onChange callback", () => {
        canvas = new Canvas();
        const myFuncSpy = spy();

        canvas.onChange(myFuncSpy);
        canvas.draw();
        canvas.setZoom(0.5);
        expect(myFuncSpy).to.have.been.called(2).with.exactly(canvas);

        const myAnotherFunc = spy();
        canvas.onChange(myAnotherFunc);
        canvas.draw();
        canvas.setZoom(0.5);
        expect(myAnotherFunc).to.have.been.called(2).with.exactly(canvas);
        expect(myFuncSpy).to.have.been.called(2).with.exactly(canvas);
    });
});