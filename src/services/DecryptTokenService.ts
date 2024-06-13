import jwt from "jsonwebtoken";

export class DecryptTokenService {
  decrypt(token: string): string {
    try {
      const JWTSECRET = process.env.JWT_SECRET;
      const userId = jwt.verify(token, JWTSECRET || '') as string;

      return userId;
    }
    catch (err) {
      console.log(err);
      return "Invalid token";
    }
  };
};
