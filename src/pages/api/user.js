
import withSession from "../../utils/session";

export default withSession(async (req, res) => {

    // console.log("A")

  const user = req.session.get("user");

  if (user) {
    res.status(200).json({ isLoggedIn: true, ...user });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});
