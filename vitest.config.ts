/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', '.next', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        '.next/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/views/**',
        '**/components/**',
        '**/app/**',
        '**/context/**',
        '**/hooks/**',
        '**/utils/**',
        '**/data/**',
        '**/types/**',
        '**/lib/blog.ts',
        '**/lib/events.ts',
        '**/lib/gallery.ts',
        '**/lib/podcasts.ts',
        '**/lib/posts.ts',
        '**/lib/videos.ts',
        '**/lib/videosServer.ts',
        '**/lib/products.ts',
        '**/lib/firebase*.ts',
        '**/lib/emailService.ts',
        '**/lib/playlist.ts',
        '**/lib/metadata.ts',
        '**/lib/blogImageUtils.ts',
        '**/lib/googleSheetsService.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
