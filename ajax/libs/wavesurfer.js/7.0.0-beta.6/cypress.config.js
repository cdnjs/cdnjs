import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';
export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            addMatchImageSnapshotPlugin(on, config);
        },
    },
});
