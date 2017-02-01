let contextCalls = [];

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

    /**
     * Draws a filled rectangle at (x, y) position whose size is determined by width and height and whose style
     * is determined by the fillStyle attribute.
     *
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     */
    fillRect(...args) {
        contextCalls.push({
            name: "fillRect",
            arguments: args,
        });
    }

    /**
     * Sets a property of the Canvas 2D API, which specifies the color or style to use inside shapes.
     *
     * @param {String|Object} style - A CSS <color> value, Canvas gradient or Canvas pattern
     */
    fillStyle(...args) {
        contextCalls.push({
            name: "fillStyle",
            arguments: args,
        });
    }

    /**
     * Creates a pattern using the specified image (a CanvasImageSource).
     * It repeats the source in the directions specified by the repetition argument.
     *
     * @param {CanvasImageSource} image - A CanvasImageSource to be used as image to repeat.
     * @param {String} repetition - A DOMString indicating how to repeat the image.
     */
    createPattern(...args) {
        contextCalls.push({
            name: "createPattern",
            arguments: args,
        });
        return {};
    }

    /**
     * Creates a path for a rectangle at position (x, y) with a size that is determined by width and height.
     * Those four points are connected by straight lines and the sub-path is marked as closed,
     * so that you can fill or stroke this rectangle.
     *
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     */
    rect(...args) {
        contextCalls.push({
            name: "rect",
            arguments: args,
        });
    }

    /**
     * Fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
     */
    fill(...args) {
        contextCalls.push({
            name: "fill",
            arguments: args,
        });
    }

    /**
     * Starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
     */
    beginPath(...args) {
        contextCalls.push({
            name: "beginPath",
            arguments: args,
        });
    }

    /**
     * Moves the starting point of a new sub-path to the (x, y) coordinates.
     *
     * @param {Number} x -The x axis of the point.
     * @param {Number} y -The y axis of the point.
     */
    moveTo(...args) {
        contextCalls.push({
            name: "moveTo",
            arguments: args,
        });
    }

    /**
     * Connects the last point in the sub-path to the x, y coordinates with a straight line
     * (but does not actually draw it).
     *
     * @param {Number} x - The x axis of the coordinate for the end of the line.
     * @param {Number} y - The y axis of the coordinate for the end of the line.
     */
    lineTo(...args) {
        contextCalls.push({
            name: "lineTo",
            arguments: args,
        });
    }

    /**
     * Causes the point of the pen to move back to the start of the current sub-path.
     * It tries to add a straight line (but does not actually draw it) from the current point to the start.
     * If the shape has already been closed or has only one point, this function does nothing.
     */
    closePath(...args) {
        contextCalls.push({
            name: "closePath",
            arguments: args,
        });
    }

    /**
     * Sets all pixels in the rectangle defined by starting point (x, y) and size (width, height) to transparent black,
     * erasing any previously drawn content.
     *
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     */
    clearRect(...args) {
        contextCalls.push({
            name: "clearRect",
            arguments: args,
        });
    }

    /**
     * Provides different ways to draw an image onto the canvas.
     *
     * @param {Number} image - An element to draw into the context.
     * @param {Number} sx - The X coordinate of the top left corner of the sub-rectangle of the source image to draw
     * into the destination context.
     * @param {Number} sy - The Y coordinate of the top left corner of the sub-rectangle of the source image to draw
     * into the destination context.
     * @param {Number} sWidth - The width of the sub-rectangle of the source image to draw into the destination context.
     * @param {Number} sHeight - The height of the sub-rectangle of the source image to draw into the destination context.
     * @param {Number} dx - The X coordinate in the destination canvas at which to place the top-left corner
     * of the source image.
     * @param {Number} dy - The Y coordinate in the destination canvas at which to place the top-left corner
     * of the source image.
     * @param {Number} dWidth - The width to draw the image in the destination canvas.
     * @param {Number} dHeight - The height to draw the image in the destination canvas.
     */
    drawImage(...args) {
        contextCalls.push({
            name: "drawImage",
            arguments: args,
        });
    }
}