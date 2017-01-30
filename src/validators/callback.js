/**
 * Validates provided callback
 *
 * @param {Function} callback - Callback function.
 */
export default function validateCallback(callback) {
    if (!callback) {
        return () => {};
    }
    if (typeof callback !== "function") {
        throw Error("Invalid callback.");
    }
    return callback;
}