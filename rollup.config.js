import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/pinyin-converter.js',
      format: 'umd',
      name: 'PinyinConverter',
      sourcemap: true,
      globals: {
        'fs': 'fs',
        'path': 'path'
      }
    },
    {
      file: 'dist/pinyin-converter.min.js',
      format: 'umd',
      name: 'PinyinConverter',
      sourcemap: true,
      plugins: [terser()],
      globals: {
        'fs': 'fs',
        'path': 'path'
      }
    },
    {
      file: 'dist/pinyin-converter.esm.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src'
    })
  ],
  external: ['fs', 'path'],
  context: 'window'
};