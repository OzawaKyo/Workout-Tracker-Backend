const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/initials/svg?seed=User"; // Un avatar généré dynamiquement


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
  