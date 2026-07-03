import "@testing-library/jest-dom/vitest";

// Общий setup для всех тестов (подключается через vitest.config.ts →
// test.setupFiles). Пока только jest-dom матчеры (toBeInTheDocument и т.п.)
// для будущих компонентных тестов — юнит-тестам lib/* он не нужен, но не
// мешает, а заводить два разных vitest-конфига ради одного файла того не стоит.
