export function getContextMock() {
    HTMLCanvasElement.prototype.getContext = function getContext(contextId) {
        return {
            fillRect: () => {},
            createPattern: () => {},
            rect: () => {},
            fill: () => {},
        };
    }
}