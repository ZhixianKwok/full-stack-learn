import diagnoses from '../data/diagnoses.json';
import { DiagnosesEntry } from '../types';

const getEntries = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};