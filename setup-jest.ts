import 'jest-preset-angular/setup-jest';

// Global mocks or polyfills for tests can be added here
Object.defineProperty(window, 'CSS', { value: null });
