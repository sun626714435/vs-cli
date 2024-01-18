export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
}

export const DataTypeString = Symbol('String')

export enum RoleTypeEnum {
  SUPER = 'super',
  TEST = 'test',
  // MeetingHolder = 'Meeting_Holder',
  // BUAdmin = 'BU_Admin',
}

export const LOCALSTORAGE_KEYS = {
  ORG: `ORG`,
  ROLE: `ROLE`,
  TOKEN: `TOKEN`,
  LOCALE: `LOCALE`,
  SYSTEM: `SYSTEM`,
  REDIRECT: `REDIRECT`,
}

export interface RoleItem {
  id: string
  roleCode: RoleItem
  roleName: string
}
