import DataBase from "../database/dataBase.js";

const db = new DataBase();

export const getAllEntities = async (req, res) => {
    const entities = await db.getAll(req.params.entityType, req.requestTime, req.method);
    await res.status(200).json(entities[0]);
};

export const getEntityById = async (req, res) => {
    const entity = await db.get(req.params.entityType, req.params.id, req.requestTime, req.method);
    await res.status(200).json(entity[0][0]);
};

export const searchEntities = async (req, res) => {
    const entities = await db.search(req.params.entityType, req.params.property, req.params.value, req.requestTime, req.method);
    await res.status(200).json(entities[0]);
};

export const deleteEntityById = async (req, res) => {
    await db.delete(req.params.entityType, req.params.id, req.requestTime, req.method);
    await res.status(200).json({ msg: "Deleted successfully" });
};

export const createEntity = async (req, res) => {
    const newEntity = {
        ...req.body,
    };
    console.log(newEntity);
    await db.insert(req.params.entityType, newEntity, req.requestTime, req.method);
    await res.status(201).json({ msg: "Created successfully" });
};
