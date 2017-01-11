import Element from "./element";

/**
 * Class representing a canvas element
 *
 */

export default class Canvas extends Element {
    /**
     * Create a canvas element.
     */
    constructor() {
        super("canvas");
    }

    /**
     * Change width of Canvas
     * @param {Number} width - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setWidth(width) {
        if (!width) {
            throw Error("Width is not passed.");
        }

        if (typeof width !== "number") {
            throw Error("Invalid width.");
        }

        if (!isFinite(width)) {
            throw Error("Invalid width.");
        }

        this.element.style.width = `${width}px`;
        return this;
    }

    /**
     * Change width of Canvas
     * @param {Number} height - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setHeight(height) {
        if (!height) {
            throw Error("Height is not passed.");
        }

        if (typeof height !== "number") {
            throw Error("Invalid height.");
        }

        if (!isFinite(height)) {
            throw Error("Invalid height.");
        }

        this.element.style.height = `${height}px`;
        return this;
    }
}