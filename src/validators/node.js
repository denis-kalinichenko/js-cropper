/**
 * Validates Node
 *
 * @param {String} node - query selector
 * @param {Object} node - node object
 * @return {Object} node - valid node object
 */
export default function validateNode(node) {
    if (!node) {
        throw Error("Node is not passed.");
    }

    let element = node;

    if (typeof element === "string") {
        element = document.querySelector(node);
        if (!element) {
            throw Error("Invalid selector.");
        }
    }

    if (!(element instanceof window.HTMLElement)) {
        throw Error("Node should be instance of window.HTMLElement or valid selector string.");
    }

    return element;
}