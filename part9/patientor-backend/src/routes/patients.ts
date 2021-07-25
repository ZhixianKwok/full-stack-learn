import express from 'express';
import patients from '../services/patients';
import toNewPatientsEntry from '../utils';

import { NonSSNPatientsEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients.getEntries());
});

router.get('/:id', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const patient = patients.getEntries().find((item:NonSSNPatientsEntry) =>item.id == req.params.id);
  res.send(patient);
});

router.post('/', (req, res) => {
    const newDiaryEntry = toNewPatientsEntry(req.body);
    res.json(patients.addEntry(newDiaryEntry));
});

export default router;