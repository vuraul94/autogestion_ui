const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, '../../apps/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
    join(__dirname, '../../libs/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        mulish: ['Mulish'],
      },
      colors: {
        main: 'var(--color-main)',
        second: 'var(--color-second)',
        third: 'var(--color-third)',
        fourth: 'var(--color-fourth)',
        error: {
          DEFAULT: '#FF3B3B',
          light: '#FF8080',
          mid: '#FF5C5C',
          dark: '#E53535'
        },
        warning: {
          DEFAULT: '#FFCC00',
          light: '#FDED72',
          mid: '#FDDD48',
          dark: '#E5B800'
        },
        info: {
          DEFAULT: '#0063F7',
          light: '#9DBFF9',
          mid: '#5B8DEF',
          dark: '#004FC4'
        },
        success: {
          DEFAULT: '#06C270',
          light: '#57EBA1',
          mid: '#39D98A',
          dark: '#05A660'
        },
        dark: {
          DEFAULT: '#3A3A3C',
          '2': '#6B7588',
          '3': '#8F90A6',
          '4': '#C7C9D9'
        },
        light: {
          DEFAULT: '#E8E8E8',
          '2': '#F3F3F3',
          '3': '#F6F6F6',
          '4': '#FAFAFC',
        },
      },
      borderRadius: {
        'xxl': '50px',
      },
    },
  },
  plugins: [],
}

module.exports = config;
