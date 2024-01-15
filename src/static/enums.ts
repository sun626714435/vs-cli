export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
}

export const DataTypeString = Symbol('String')

export enum RoleTypeEnum {
  CM = 'CM',
  LE = 'LE',
  MeetingHolder = 'Meeting_Holder',
  BUAdmin = 'BU_Admin',
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

export interface UserInfo {
  id: string
  userCode: string
  lastName: string
  firstName: string
  shortName: string
  email: string
  roles: RoleItem[]
}
