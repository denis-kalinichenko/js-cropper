import Size from "./../objects/size";

/**
 * Class representing a base element
 */
export default class Element {
    /**
     * Create an element
     *
     * @param {String|Object} node - The element.
     */
    constructor(node) {
        this._node = node;
        if (!node || typeof node === "string") {
            this._node = document.createElement(node || "div");
        }
    }

    /**
     * Add an Element's node to the end of the list of children of a specified parent node
     *
     * @param {Object} parent - The DOM Element object, parent node
     * @return {Element} An Element object.
     */
    render(parent) {
        if (!parent) {
            throw Error("Parent node are not passed.");
        }

        parent.appendChild(this._node);
        return this;
    }

    /**
     * Change width of Element
     *
     * @param {Number} width - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setWidth(width) {
        this._node.width = width;
        return this;
    }

    /**
     * Change width of Element
     *
     * @param {Number} height - The number of pixels.
     * @return {Canvas} A Canvas object.
     */
    setHeight(height) {
        this._node.height = height;
        return this;
    }

    /**
     * Get a drawing 2d context on the canvas
     *
     * @return {Object} - RenderingContext
     */
    getSize() {
        return new Size(this._node.width, this._node.height);
    }

    /**
     * Get a drawing 2d context on the canvas
     *
     * @return {Object} - A node.
     */
    getNode()  {
        return this._node;
    }

    /**
     *  Get a drawing 2в context on the canvas
     *
     * @return {Object} - RenderingContext
     */
    getContext2d() {
        return this._node.getContext("2d");
    }
}