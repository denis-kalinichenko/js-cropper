/**
 * Class representing a base element
 *
 */

export default class Element {
    /**
     * Create an element
     *
     * @param {String} tagName - The name of element tag.
     */
    constructor(tagName) {
        this.element = document.createElement(tagName || "div");
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

        parent.appendChild(this.element);
        return this;
    }
}