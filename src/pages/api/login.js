import { PrismaClient } from "@prisma/client";
import withSession from "../../utils/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { name, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { name: name,},
    });

    if (user && user.password === password) {
      req.session.set("user", {
        id: user.id,
        email: user.email,
        name: user.name
      });
      await req.session.save();
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
});
