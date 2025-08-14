import '@testing-library/jest-dom';
// Global test setup
// This file runs before each test file
// Mock DOM APIs that might not be available in jsdom
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
// Mock ResizeObserver
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
// Mock IntersectionObserver  
globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
// Mock requestAnimationFrame
globalThis.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
    return setTimeout(cb, 0);
});
globalThis.cancelAnimationFrame = vi.fn().mockImplementation((id) => {
    clearTimeout(id);
});
// Mock performance.now for timing-related tests
Object.defineProperty(window, 'performance', {
    writable: true,
    value: {
        now: vi.fn(() => Date.now())
    }
});
// Mock CSS properties that might be used by gridstack
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: () => '',
        width: '100px',
        height: '100px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '0px'
    })
});
// Mock scrollTo for tests that might trigger scrolling
window.scrollTo = vi.fn();
// Setup DOM environment
Object.defineProperty(window, 'location', {
    value: {
        href: 'http://localhost:3000',
        origin: 'http://localhost:3000',
        pathname: '/',
        search: '',
        hash: ''
    },
    writable: true
});
// Global test utilities
globalThis.createMockElement = (tagName = 'div', attributes = {}) => {
    const element = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
};
// Console error/warning suppression for expected errors in tests
const originalError = console.error;
const originalWarn = console.warn;
beforeEach(() => {
    // Reset console methods for each test
    console.error = originalError;
    console.warn = originalWarn;
});
// Helper to suppress expected console errors/warnings
globalThis.suppressConsoleErrors = () => {
    console.error = vi.fn();
    console.warn = vi.fn();
};
//# sourceMappingURL=vitest.setup.js.map