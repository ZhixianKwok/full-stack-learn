import patients from "../data/patients";
import { NonSSNPatientsEntry,NewPatientsEntry,PatientsEntry } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Array<NonSSNPatientsEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    };
  });
};

const addEntry = (entry:NewPatientsEntry): PatientsEntry => {
  const patient = {
    id: uuid(),
    ...entry
  };
  patients.push(patient);
  return patient;
};

export default {
  getEntries,
  addEntry,
};
