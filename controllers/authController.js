export const register = async (req, res) => {
  const { email, password, name } = req.body;

  console.log("Received data:", req.body); // 🛠 Vérifier les données reçues

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    console.log("Received data:", req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "Unknown",
        avatar: "1",
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Received data:", req.body);
    
    console.error("Error registering user:", error); // 🛠 Debug
    res.status(500).json({ message: "Error registering user" });
  }
};
