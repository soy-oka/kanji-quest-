import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // IMPORTANT: Replace 'kanji-quest' with your actual repository name
    base: '/kanji-quest/',
})