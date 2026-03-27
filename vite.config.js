import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const repoBasePath = '/Settings-Management-SPA/';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? repoBasePath : '/',
  plugins: [react()],
}));
