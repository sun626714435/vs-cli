export const DataTypeString = Symbol('String')

export enum YES_OR_NO {
  YES = 'Y',
  NO = 'N',
}

export enum RoleTypeEnum {
  CM = 'CM',
  LE = 'LE',
  MeetingHolder = 'Meeting_Holder',
  BUAdmin = 'BU_Admin',
}

export enum SelectorRoleType {
  CM = 'CM',
  LE = 'LE',
  SE = 'SE',
  MeetingHolder = 'Meeting_Holder',
  BUAdmin = 'BU_Admin',
}

export enum UserStatus {
  Active = 0,
  Inactive = 1,
}

export const LOCALSTORAGE_KEYS = {
  ORG: `${import.meta.env.VITE_APP_NAME}_ORG`,
  ROLE: `${import.meta.env.VITE_APP_NAME}_ROLE`,
  TOKEN: `${import.meta.env.VITE_APP_NAME}_TOKEN`,
  LOCALE: `${import.meta.env.VITE_APP_NAME}_LOCALE`,
  SYSTEM: `${import.meta.env.VITE_APP_NAME}_SYSTEM`,
  REDIRECT: `${import.meta.env.VITE_APP_NAME}_REDIRECT`,
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


