import express from "express";

import aclMiddlware from "./middlewares/acl.middleware";
import uploadMiddleware from "./middlewares/upload.middleware";
import authMiddleware from "./middlewares/auth.middleware";
import uploadController from "./controllers/upload.controller";
import productsController from "./controllers/products.controller";
import CategoryController from "@/controllers/category.controller";
import authController from "./controllers/auth.controller";
import { createOrder, getOrderHistory } from './controllers/order.controller';

const router = express.Router();

router.get("/products", productsController.findAll);
router.post("/products", productsController.create);
router.get("/products/:id", productsController.findOne);
router.put("/products/:id", productsController.update);
router.delete("/products/:id", productsController.delete);


router.post("/categories", CategoryController.create);
router.get("/categories", CategoryController.findAll);
router.get("/categories/:id", CategoryController.findOne);
router.put("/categories/:id", CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

router.post("/upload", uploadMiddleware.single, uploadController.single);
router.post("/uploads", uploadMiddleware.multiple, uploadController.multiple);

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.get("/auth/me", authController.me);
router.put("/auth/profile", authMiddleware, authController.profile);

router.get("/auth/me", authMiddleware, authController.me);
router.get(
    "/auth/me",
    [authMiddleware, aclMiddlware(["admin"])],
    authController.me
  );
  router.post('/orders', authMiddleware, createOrder);
  router.get('/orders', authMiddleware, getOrderHistory);
export default router;
