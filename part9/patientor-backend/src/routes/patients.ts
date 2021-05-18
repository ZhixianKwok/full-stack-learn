import express from 'express';
import patients from '../services/patients';
import toNewPatientsEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patients.getEntries());
});

router.post('/', (req, res) => {
    const newDiaryEntry = toNewPatientsEntry(req.body);
    res.json(patients.addEntry(newDiaryEntry));
});

export default router;