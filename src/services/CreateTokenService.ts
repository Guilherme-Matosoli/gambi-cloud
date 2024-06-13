import jwt from "jsonwebtoken";

export class CreateTokenService {
  async create(userId: string) {
    try {
      const JWTSECRET = process.env.JWT_SECRET as string;
      const token = jwt.sign(userId, JWTSECRET);

      return token;
    }
    catch (err) {
      console.log(err);
    }
  };
};
