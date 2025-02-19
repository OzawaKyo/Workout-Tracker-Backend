import { AVATAR_OPTIONS } from "../config/avatars.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateName = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: { name },
      select: { id: true, name: true, email: true, avatar: true },
    });

    res.json({ message: "Name updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating name" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
      const userId = req.user.userId; // ✅ Corrige ici, car le token stocke "userId" et non "id"

      if (!userId) {
          return res.status(400).json({ message: "User ID not found" });
      }

      const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, name: true, avatar: true, createdAt: true }
      });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
    try {
        // L'utilisateur est déjà extrait dans `req.user` grâce au middleware
        res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            avatar: req.user.avatar, // On renvoie aussi l'avatar
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;
        const userId = req.user.id; // Récupéré depuis le middleware d'authentification

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email, avatar },
        });

        res.json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAvatars = (req, res) => {
  res.json({ avatars: AVATAR_OPTIONS });
};

export const updateAvatar = async (req, res) => {
  try {
      const { id, avatar } = req.body; // On récupère id et avatar depuis le body

      if (!id) {
          return res.status(400).json({ message: "User ID is required" });
      }

      const updatedUser = await prisma.user.update({
          where: { id: Number(id) }, // Convertit en nombre si c'est un ID numérique
          data: { avatar }
      });

      res.status(200).json(updatedUser);
  } catch (error) {
      console.error("Error updating avatar:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};

