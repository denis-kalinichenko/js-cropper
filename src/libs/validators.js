/**
 * Validates Node
 *
 * @param {String} node - query selector
 * @param {Object} node - node object
 * @return {Object} node
 */

export function validateNode(node) {
    if (!node) {
        throw Error("Node is not passed.");
    }

    if (typeof node === "string") {
        node = document.querySelector(node);
        if (!node) {
            throw Error("Invalid selector.");
        }
    }

    if (!(node instanceof window.HTMLElement)) {
        throw Error("Node should be instance of window.HTMLElement or valid selector string.");
    }

    return node;
}