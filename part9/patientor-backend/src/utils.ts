import { Entry, Gender, NewPatientsEntry } from './types';


type Fields = { name : unknown, dateOfBirth: unknown, gender: unknown,ssn:unknown, occupation: unknown ,entries:unknown};

const toNewPatientsEntry = ({name,dateOfBirth,gender,ssn,occupation,entries}:Fields): NewPatientsEntry => {
  const newEntry: NewPatientsEntry = {
    name:parseName(name),
    dateOfBirth : parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation : parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  
  return newEntry;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
      throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseEntries = (entries:unknown): Entry[] => {
  if(!entries || !isEntries(entries)){
    throw new Error('Incorrect or missing entries' + entries);
  }
  return entries;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntries = (entries: unknown): entries is Entry[] => {
    console.log(entries);
    return true;
    // eslint-disable-next-line @typescript-eslint/semi
}



export default toNewPatientsEntry;