import { Router } from "express";
import { 
    newInvestmentFund,
    allInvestmentFunds,
    createNewInvestmentFund,
    editInvestmentFund,
    updateInvestmentFund,
    deleteInvestmentFund
} 
from "../controllers/investmentFunds.controller";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// Get All investment funds
router.get("/investmentFunds", isAuthenticated, allInvestmentFunds);

// Post investment funds
router.get("/investmentFunds/add", isAuthenticated, newInvestmentFund);

router.post("/investmentFunds/newInvestmentFund", isAuthenticated, createNewInvestmentFund);

// Edit Notes
router.get("/investmentFunds/edit/:id", isAuthenticated, editInvestmentFund);

router.put("/investmentFunds/editInvestmentFund/:id", isAuthenticated, updateInvestmentFund);

// Delete Notes
router.delete("/investmentFunds/delete/:id", isAuthenticated, deleteInvestmentFund);

export default router;
