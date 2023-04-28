import express from "express";
import { authTokenMiddleware } from "../middlewares";
import contractController from "../controllers/contract.controllers";
const contractRouter = express.Router();
contractRouter.post('/contracts', authTokenMiddleware,contractController.createContract);
contractRouter.get('/contracts/host', authTokenMiddleware, contractController.getContractByHost);
contractRouter.get('/contracts/guest', authTokenMiddleware, contractController.getContractByGuest);
contractRouter.get('/contracts/find-contract', authTokenMiddleware, contractController.findContract);
contractRouter.get('/contracts/:contract_id', authTokenMiddleware, contractController.getContractById);
contractRouter.put('/contracts/:contract_id', authTokenMiddleware, contractController.updateContract);
export default contractRouter;