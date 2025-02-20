import express from "express";
import { getUserInfo, getAvatars, updateAvatar, updateName } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     description: Retourne les informations de l'utilisateur actuellement authentifié.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès.
 *       401:
 *         description: Non autorisé, token manquant ou invalide.
 */
router.get("/me", authMiddleware, getUserInfo);

/**
 * @swagger
 * /users/avatars:
 *   get:
 *     summary: Récupérer la liste des avatars disponibles
 *     description: Retourne la liste des avatars que l'utilisateur peut choisir.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des avatars récupérée avec succès.
 */
router.get("/avatars", getAvatars);

/**
 * @swagger
 * /users/update-avatar:
 *   put:
 *     summary: Mettre à jour l'avatar de l'utilisateur
 *     description: Permet à un utilisateur authentifié de changer son avatar.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 example: "avatar1.png"
 *     responses:
 *       200:
 *         description: Avatar mis à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       401:
 *         description: Non autorisé, token manquant ou invalide.
 */
router.put("/update-avatar", authMiddleware, updateAvatar);

/**
 * @swagger
 * /users/update-name:
 *   put:
 *     summary: Mettre à jour le nom de l'utilisateur
 *     description: Permet à un utilisateur authentifié de modifier son nom.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "NouveauNom"
 *     responses:
 *       200:
 *         description: Nom mis à jour avec succès.
 *       400:
 *         description: Données invalides.
 *       401:
 *         description: Non autorisé, token manquant ou invalide.
 */
router.put("/update-name", authMiddleware, updateName);

export default router;
