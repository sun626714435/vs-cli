import { defineStore } from 'pinia'
import { RoleTypeEnum } from '@/static/enums'

type AccessesState = {
  canAccessSystem: boolean
}

function containsAny(arr1: string[], arr2: string[]): boolean {
  return arr1.some((r) => arr2.includes(r))
}

export const useAccessesStore = defineStore<
  'ACCESSES',
  AccessesState,
  {},
  { setAccesses: (roles: RoleTypeEnum[]) => void; clearAccesses: () => void }
>('ACCESSES', {
  state: () => ({
    canAccessSystem: false,
  }),
  actions: {
    setAccesses(roles: RoleTypeEnum[]) {
      if (roles?.length) {
        this.canAccessSystem = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])
      }
    },
    clearAccesses() {
      this.canAccessSystem = false
    },
  },
})
