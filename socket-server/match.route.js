// matchRoutes.js
import express from 'express';
import { generateId } from './helpers/generater.js';
import { getAllDoc,postNewMatach } from './database/db.access.js';

const router = express.Router();

router.post('/new/match',async (req, res) => {
  const { playerName1, playerName2, roomName, tableStatus, turnToMove } = req.body;

  const match = {
    _id: generateId + "",
    playerName1,
    playerName2,
    roomName,
    tableStatus,
    turnToMove
  };

  const response = await postNewMatach(match);
  if (!response) {
    res.status(500).send({message: "server error"});
    return;
  } 
  res.status(201).send(response);
});

router.get('/all/match',async (req,res) => {
  const allMatch = await getAllDoc();
  
  if (!allMatch) {
    res.status(500).send({message: "server error"})
    return;
  }
  res.status(200).send(allMatch)
})

export default router;
