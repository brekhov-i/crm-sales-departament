import { RouteLocationRaw } from "vue-router"

export type Severity = 'success' | 'danger' | 'warn' | 'info'

export type PositionAll = 'top' | 'bottom' | 'right' | 'left'

export type PositionX = 'right' | 'left'

export type PositionY = 'top' | 'bottom'

export type Size = 'small' | 'normal' | 'large' | 'xLarge'

export interface MenuItem {
  label: string,
  link: string | RouteLocationRaw,
  menuItems?: MenuItem[]
}
