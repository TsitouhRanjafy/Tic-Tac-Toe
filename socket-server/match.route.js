// matchRoutes.js
import express from 'express';
import { generateId } from './helpers/generater.js';
import { findByRoomName, getAllDoc, postNewMatch, updateMatch } from './database/db.access.js';


const router = express.Router();

router.post('/new/match',async (req, res) => {
  const { playerName1, playerName2, roomName, tableStatus, turnToMove,playerId1,playerId2 } = req.body;

  const match = {
    _id: generateId(),
    playerName1,
    playerName2,
    roomName,
    tableStatus,
    turnToMove,
    playerId1,
    playerId2,
  };

  try {
    const response = await postNewMatch(match);
    res.status(201).send(response);
  } catch (error) {
    console.error("Erreur lors de la création du match :", error);
    res.status(500).send({ message: "Erreur serveur interne" });
  }
});


router.put('/update/match/:rooName',async (req,res) => {
  const { rooName } = req.params;
  try {
    const match = await findByRoomName(rooName);
    if (match.length == 0) res.status(200).send({message: "match not exist"});
    match[0].playerName1 = "tsito";
    const response = await updateMatch(match[0])
    res.status(200).send(response)
  } catch (error) {
    console.error("Erreur lors de update match:", error);
    res.status(500).send({ message: "Erreur serveur interne" });
  }
})

router.get('/all/match',async (req,res) => {
  try {
    const allMatch = await getAllDoc();
    res.status(200).send(allMatch)
  } catch (error) {
    console.error("Erreur lors de get all match :", error);
    res.status(500).send({ message: "Erreur serveur interne" });
  }
})


router.get('/find/match/:roomName',async (req,res) => {
  const roomName = req.params.roomName;
  try {
    const match = await findByRoomName(roomName);
    res.status(200).send(match);
  } catch (error) {
    console.error("Erreur lors de la du find match :", error);
    res.status(500).send({ message: "Erreur serveur interne" });
  }
})
export default router;
