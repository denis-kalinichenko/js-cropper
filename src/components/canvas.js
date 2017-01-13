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
        this.ctx = this.element.getContext("2d");
    }

    /**
     * Change width of Canvas
     *
     * @param {Number} width - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setWidth(width) {
        this.element.width = width;
        return this;
    }

    /**
     * Change height of Canvas
     *
     * @param {Number} height - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setHeight(height) {
        this.element.height = height;
        return this;
    }
}