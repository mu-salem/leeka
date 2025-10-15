import { generateToken } from "../../utils/token/token.js";
import { Admin } from "./../../DB/models/admin.model.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await Admin.findOne({ email });
  if (!user) return next(new Error("Invalid email!"), { cause: 400 });

  return res.status(200).json({
    success: true,
    token: generateToken({
      payload: { id: user._id, email: user.email },
    }),
  });
};

