import Element from "./element";

/**
 * Class representing a canvas element
 *
 */

export default class Canvas extends Element {
    /**
     * Create a canvas.
     */
    constructor() {
        super("canvas");
    }

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
    }

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
    }
}