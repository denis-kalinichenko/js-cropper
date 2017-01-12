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

    if (Object.prototype.toString.call(config) !== "[object Object]") {
        throw Error("Invalid config.");
    }

    const width = config.width || 300;
    const height = config.height || 300;

    return {
        width: validateDimension(width),
        height: validateDimension(height)
    };
}

/**
 * Validates provided dimension (width or height)
 *
 * @param {Number} value - config object
 * @return {Number} value - valid dimension
 */
export function validateDimension(value) {
    if (!value) {
        throw Error("Dimension is not passed.");
    }

    if (typeof value !== "number") {
        throw Error("Invalid dimension.");
    }

    if (!isFinite(value)) {
        throw Error("Invalid dimension.");
    }

    return value;
}