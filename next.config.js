/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // standalone-режим, чтобы поменьше говна гонять при сборке...
  // TODO убрать этот костыль
  // Игнорирует ошибки линтера при билде приложения (next build)
  // Warning: Это позволяет завершить сборку успешно, даже если в проекте есть ошибки ESLint.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TODO убрать этот костыль
  // Игнорирует ошибки тайпскрипта при билде приложения (next build)
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
