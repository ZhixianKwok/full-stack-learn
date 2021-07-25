// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface DiagnosesEntry {
    code: string,
    name: string,
    latin ?: string
  } 

export interface PatientsEntry {
     id: string,
     name: string,
     dateOfBirth : string,
     ssn: string,
     gender: Gender,
     occupation : string,
     entries: Entry[]
}

export enum Gender {
  male = 'male',
  female = 'female'
}

export type NewPatientsEntry = Omit<PatientsEntry, 'id'>;

export type NonSSNPatientsEntry = Omit<PatientsEntry, 'ssn'>;
