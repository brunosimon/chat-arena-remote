import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

export default defineConfig({
    root: 'sources',
    publicDir: '../public',
    plugins:
    [
        mkcert(),
        react(),
    ],
    server:
    {
        port: 2012,
        https: true,
        host: true,
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    envDir: __dirname,
})
