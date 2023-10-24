import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        target: 'esnext' //browsers can handle the latest ES features
    },
    server: {
        port: 5173,
    },
});
