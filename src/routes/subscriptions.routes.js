import { Router } from "express";
import { 
    newSubscription,
    allSubscriptions,
    createNewSubscription,
    cancelSubscription,
} 
from "../controllers/subscription.controller";

import { isAuthenticated } from "../helpers/auth";

const router = Router();

// Get All Subscriptions
router.get("/subscriptions", isAuthenticated, allSubscriptions);

// Post Subscriptions
router.get("/subscriptions/add", isAuthenticated, newSubscription);

router.post("/subscriptions/newSubscription", isAuthenticated, createNewSubscription);

// Cancel Subscriptions
router.delete("/subscriptions/delete/:id", isAuthenticated, cancelSubscription);

export default router;
