import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'easy-email-core': path.resolve('../easy-email-core'),
      '@momos/easy-email-core': path.resolve('../easy-email-core'),
    },
  },
  define: {},
  build: {
    emptyOutDir: false,
    minify: true,
    manifest: false,
    sourcemap: true,
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'easy-email-editor',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      plugins: [],
      external: [
        'react',
        'react-dom',
        'react-dom/server',
        'mjml-browser',
        'react-final-form',
        'easy-email-core',
        '@momos/easy-email-core',
      ],
      output: {},
    },
    outDir: 'lib',
  },
  optimizeDeps: {
    include: ['easy-email-core', '@momos/easy-email-core'],
  },
  css: {
    modules: {
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
});
