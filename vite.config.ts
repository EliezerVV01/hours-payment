import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "happy-dom",
    root: "./src/tests",
    environment: "happy-dom",
  },
});
