/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        // Enable globals (describe, it, expect, etc.) without imports
        globals: true,
        // Use jsdom for DOM simulation (required for testing DOM-related code)
        environment: 'jsdom',
        // Setup files to run before tests
        setupFiles: ['./vitest.setup.ts'],
        // Test file patterns
        include: [
            'spec/**/*-spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            'spec/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
            'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
        ],
        // Exclude patterns
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/angular/**',
            '**/react/**',
            '**/demo/**',
            '**/spec/e2e/**' // Exclude old Protractor E2E tests
        ],
        // Coverage configuration
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            exclude: [
                'coverage/**',
                'dist/**',
                'node_modules/**',
                'demo/**',
                'angular/**',
                'react/**',
                '**/*.d.ts',
                '**/*.config.{js,ts}',
                '**/karma.conf.js',
                'scripts/**',
                'spec/e2e/**' // Exclude e2e tests from coverage
            ],
            // Coverage thresholds (optional - set to your desired levels)
            thresholds: {
                global: {
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    statements: 80
                }
            },
            // Include source files for coverage even if not tested
            all: true,
            include: ['src/**/*.{js,ts}']
        },
        // Test timeout (in milliseconds)
        testTimeout: 10000,
        // Hook timeout (in milliseconds) 
        hookTimeout: 10000,
        // Reporter configuration
        reporters: ['verbose', 'html'],
        // Output directory for test results
        outputFile: {
            html: './coverage/test-results.html'
        }
    },
    // Resolve configuration for imports
    resolve: {
        alias: {
            '@': '/src'
        }
    }
});
//# sourceMappingURL=vitest.config.js.map