import jwt, { JwtPayload } from "jsonwebtoken";

export class DecryptToken {
  decrypt(token: string): string {
    try {
      const JWTSECRET = process.env.JWT_SECRET as string;
      const { userId } = jwt.verify(token, JWTSECRET) as JwtPayload;

      return userId;
    }
    catch (err) {
      console.log(err);
      return "Invalid token";
    }
  };
};
