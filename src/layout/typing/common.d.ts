export interface Menu {
  name: string
  path: string
  activePath?: string
  icon?: string
  img?: string
  children?: Menu[]
  type?: string // push replace
  permission?: string
  highlightable?: boolean
  customIconName?: string
  meta?: {
    showPersonalStatus: boolean
  }
}
