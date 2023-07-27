
import { PrismaClient, User } from "@prisma/client";
import withSession from "../../utils/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: { email, password, name },
      });
      
      req.session.set("user", {
        id: user.id,
        email: user.email,
        name: user.name
      });
      await req.session.save();
      res.status(200).json(user);
    } else {
      res.status(409).json({ message: "Email already in use" });
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
});
