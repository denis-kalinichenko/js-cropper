import Size from "./../src/objects/size";
import Point from "./../src/objects/point";

let contextCalls = [];
/**
 * @returns {Array} contextCalls - An Array of calls.
 */
export function getContextCalls() {
    return contextCalls;
}

/**
 * Class representing a Context class mock
 */
export class ContextMock {
    /**
     * Create a context mock
     */
    constructor(context) {
        this._context = context;
        contextCalls = [];
    }

    fillRect(...args) {
        contextCalls.push({
            name: "fillRect",
            arguments: args,
        });
    }

    fillStyle(...args) {
        contextCalls.push({
            name: "fillStyle",
            arguments: args,
        });
    }

    createPattern(...args) {
        contextCalls.push({
            name: "createPattern",
            arguments: args,
        });
        return {};
    }

    rect(...args) {
        contextCalls.push({
            name: "rect",
            arguments: args,
        });
    }

    fill(...args) {
        contextCalls.push({
            name: "fill",
            arguments: args,
        });
    }

    beginPath(...args) {
        contextCalls.push({
            name: "beginPath",
            arguments: args,
        });
    }

    moveTo(...args) {
        contextCalls.push({
            name: "moveTo",
            arguments: args,
        });
    }

    lineTo(...args) {
        contextCalls.push({
            name: "lineTo",
            arguments: args,
        });
    }

    closePath(...args) {
        contextCalls.push({
            name: "closePath",
            arguments: args,
        });
    }

    clearRect(...args) {
        contextCalls.push({
            name: "clearRect",
            arguments: args,
        });
    }

    drawImage(...args) {
        contextCalls.push({
            name: "drawImage",
            arguments: args,
        });
    }
}

let nodes = {};

/**
 * @returns {Array} nodes - Array of nodes.
 */
export function getNodes() {
    return nodes;
}

let canvasCalls = [];

export function getCanvasCalls() {
    return canvasCalls;
}
/**
 * Class representing a Canvas class mock
 */
export class CanvasMock {
    constructor() {
        nodes.canvas = document.createElement("canvas");
        canvasCalls = [];
    }

    getNode() {
        return nodes.canvas;
    }

    setWidth(...args) {
        canvasCalls.push({
            name: "setWidth",
            arguments: args
        });
        return this;
    }

    setHeight(...args) {
        canvasCalls.push({
            name: "setHeight",
            arguments: args
        });
        return this;
    }

    render(...args) {
        canvasCalls.push({
            name: "render",
            arguments: args
        });
        return this;
    }

    setImage(...args) {
        canvasCalls.push({
            name: "setImage",
            arguments: args
        });
        return this;
    }

    draw(...args) {
        canvasCalls.push({
            name: "draw",
            arguments: args
        });
        return this;
    }

    onChange(spy) {
        this._onChangeCallback = spy();
        return this;
    }

    redraw() {
        return this;
    }

    setZoom(...args) {
        canvasCalls.push({
            name: "setZoom",
            arguments: args
        });
        return this;
    }

    getData() {
        return {
            origin: { x: 234.42906574394465, y: 44.117647058823536 },
            size: { width: 500, height: 500 },
        };
    }

    setData(...args) {
        canvasCalls.push({
            name: "setData",
            arguments: args
        });
        return {
            zoom: 0.7,
            origin: new Point(26, 26),
        }
    }
}

/**
 * Class representing a Frame class mock
 */
export class FrameMock {
    getRect() {
        return {
            size: new Size(289, 289),
            origin: new Point(135.5, 25.5)
        };
    }

    getMinX() {
        return 135.5;
    }

    getMinY() {
        return 25.5;
    }

    getMaxY() {
        return 314.5;
    }

    getMaxX() {
        return 424.5;
    }

    getMidX() {
        return 280;
    }

    getMidY() {
        return 170;
    }

    update() {
        return this;
    }
}

/**
 * Class representing a Pattern class mock
 */
export class PatternMock {
    constructor() {
        nodes.pattern = document.createElement("canvas");
    }

    getNode() {
        return nodes.pattern;
    }
}

/**
 * Class representing a Cutout class mock
 */
export class CutoutMock {
    draw() {
        return this;
    }
}

/**
 * Class representing a Generator class mock
 */
export class GeneratorMock {
    constructor() {
        nodes.generator = document.createElement("canvas");
    }

    getNode() {
        return nodes.generator;
    }
}