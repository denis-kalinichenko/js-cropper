export function getContextMock() {
    HTMLCanvasElement.prototype.getContext = (contextId) => {
        return {
            fillRect: () => {},
            createPattern: () => {},
            rect: () => {},
            fill: () => {},
        };
    }
}