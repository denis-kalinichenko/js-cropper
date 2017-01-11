/**
 * Validates Node
 *
 * @param {String} node - query selector
 * @param {Object} node - node object
 * @return {Object} node - valid node object
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

/**
 * Validates provided Image Crop config
 *
 * @param {Object} config - config object
 * @return {Object} node - valid config object
 */
export function validateConfig(config) {
    if (!config) {
        throw Error("Config is not passed.");
    }

    if (config.constructor !== Object) {
        throw Error("Invalid config.");
    }

    return {
        width: config.width || 300,
        height: config.height || 300
    };
}