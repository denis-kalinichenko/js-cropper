/**
 * Validates provided Image Crop config
 *
 * @param {Object} config - config object
 */
export default function validateConfig(config) {
    if (!config) {
        throw Error("Config is not passed.");
    }

    if (Object.prototype.toString.call(config) !== "[object Object]") {
        throw Error("Invalid config.");
    }
}