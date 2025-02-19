export const register = async (req, res) => {
  const { email, password, name } = req.body; // Ajout de name

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Avatar1", // Avatar par défaut
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};
