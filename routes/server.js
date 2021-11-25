import { Router } from "express";
import { getAllEntities, getEntityById, searchEntities, deleteEntityById, createEntity } from "../controllers/serverController.js";

const router = Router();

router.get("/server/:entityType", getAllEntities);

router.get("/server/:entityType/:id", getEntityById);

router.get("/server/:entityType/search/:property/:value", searchEntities);

router.delete("/server/:entityType/:id/delete", deleteEntityById);

router.post("/server/:entityType", createEntity);

export default router;
