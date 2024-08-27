/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: string,
    access?: string | string[]
    [key: string]: any; // Для других возможных свойств
  }
}
