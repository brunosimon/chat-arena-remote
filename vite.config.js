import { defineConfig, loadEnv } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

export default ({ mode }) =>
{
    process.env = {...process.env, ...loadEnv(mode, process.cwd())}

    return defineConfig({
        root: 'sources',
        publicDir: '../public',
        mode: mode,
        plugins:
        [
            mkcert(),
            react(),
        ],
        server:
        {
            port: mode === 'live' ? 2012 : 2014,
            https: true,
            host: true,
            hmr: mode === 'development',
        },
        build:
        {
            outDir: '../dist',
            emptyOutDir: true,
            sourcemap: true
        },
        envDir: __dirname,
    })
}