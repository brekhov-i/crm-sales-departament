/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean // по-умолчанию всегда true, если указать false, то не будет проверки авторизации
    layout?: string,
    access?: string | string[],
    title?: string
    menuTitle?: string
    [key: string]: any; // Для других возможных свойств
  }
}
