/**
 * Class representing a base element
 */
export default class Element {
    /**
     * Create an element
     *
     * @param {String|Object} name - The name of element tag.
     */
    constructor(name) {
        this._node = document.createElement(name || "div");
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
     *  Get a drawing 2в context on the canvas
     *
     * @return {Object} - RenderingContext
     */
    getContext2d() {
        return this._node.getContext("2d");
    }
}