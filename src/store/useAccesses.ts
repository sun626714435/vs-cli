import { defineStore } from 'pinia'
import { RoleTypeEnum } from '@/static/enums'

type AccessesState = {
  canAccessDashboard: boolean
  canAccessDictionary: boolean
  canAccessUserManagement: boolean
  canAccessCaseManagement: boolean
  canAccessCases: boolean
  canAccessCasesCM: boolean
  canAccessCasesLE: boolean
  canAccessCasesMeetingHolder: boolean
  canAccessCaseCompile: boolean
  canAccessTag: boolean
  canAccessNev: boolean
  canAccessCM: boolean
  canAccessLE: boolean
  canAccessMeetingHolder: boolean
  canAccessCMAndLE: boolean
  canAccessCMAndMeetingHolder: boolean
  canAccessCMAndLEAndMeetingHolder: boolean
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
    canAccessDashboard: false,
    canAccessDictionary: false,
    canAccessUserManagement: false,
    canAccessCaseManagement: false,
    canAccessCases: false,
    canAccessCasesCM: false,
    canAccessCasesLE: false,
    canAccessCasesMeetingHolder: false,
    canAccessCaseCompile: false,
    canAccessTag: false,
    canAccessNev: false,

    canAccessCM: false,
    canAccessLE: false,
    canAccessMeetingHolder: false,
    canAccessCMAndLE: false,
    canAccessCMAndMeetingHolder: false,
    canAccessCMAndLEAndMeetingHolder: false,
  }),
  actions: {
    setAccesses(roles: RoleTypeEnum[]) {
      if (roles?.length) {
        this.canAccessDashboard = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])

        this.canAccessDictionary = containsAny(roles, [RoleTypeEnum.BUAdmin])
        this.canAccessUserManagement = containsAny(roles, [RoleTypeEnum.BUAdmin])

        // Case Management
        this.canAccessCaseManagement = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])

        // Case Management - Cases
        this.canAccessCases = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])
        this.canAccessCasesCM = containsAny(roles, [RoleTypeEnum.CM])
        this.canAccessCasesLE = containsAny(roles, [RoleTypeEnum.LE])
        this.canAccessCasesMeetingHolder = containsAny(roles, [RoleTypeEnum.MeetingHolder])

        // Case Management - Cases - Compile
        this.canAccessCaseCompile = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])

        this.canAccessTag = containsAny(roles, [RoleTypeEnum.CM, RoleTypeEnum.LE])
        this.canAccessNev = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])

        this.canAccessCM = containsAny(roles, [RoleTypeEnum.CM])
        this.canAccessLE = containsAny(roles, [RoleTypeEnum.LE])
        this.canAccessMeetingHolder = containsAny(roles, [RoleTypeEnum.MeetingHolder])
        this.canAccessCMAndLE = containsAny(roles, [RoleTypeEnum.CM, RoleTypeEnum.LE])
        this.canAccessCMAndMeetingHolder = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.MeetingHolder,
        ])
        this.canAccessCMAndLEAndMeetingHolder = containsAny(roles, [
          RoleTypeEnum.CM,
          RoleTypeEnum.LE,
          RoleTypeEnum.MeetingHolder,
        ])
      }
    },
    clearAccesses() {
      this.canAccessDashboard = false
      this.canAccessDictionary = false
      this.canAccessUserManagement = false
      this.canAccessCaseManagement = false
      this.canAccessCases = false
      this.canAccessCasesCM = false
      this.canAccessCasesLE = false
      this.canAccessCasesMeetingHolder = false
      this.canAccessCaseCompile = false
      this.canAccessTag = false
      this.canAccessNev = false

      this.canAccessCM = false
      this.canAccessLE = false
      this.canAccessMeetingHolder = false
      this.canAccessCMAndLE = false
      this.canAccessCMAndMeetingHolder = false
      this.canAccessCMAndLEAndMeetingHolder = false
    },
  },
})
