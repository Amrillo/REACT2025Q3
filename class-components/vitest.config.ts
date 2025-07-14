import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
     coverage: {
     include: ['src/**/*.{js,jsx,ts,tsx}'],
     exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
        'src/**/*.d.ts'
         ],
    },
     
  },
  
})