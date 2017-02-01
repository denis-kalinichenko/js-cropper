

export function getContextMock() {
    HTMLCanvasElement.prototype.getContext = (contextId) => {
        return {
            fillRect: () => {},
            createPattern: () => {},
            rect: () => {},
            fill: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            closePath: () => {},
        };
    }
}

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

export class CanvasMock {
    constructor() {

    }
}

export class FrameMock {
    constructor() {

    }
}