import { RoleName } from "../constants/roles.constant.js";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: RoleName | string;
      email: string;
    }

    interface Request {
      user?: User;
      authToken?: string;
      authTokenExpiresAt?: number;
    }
  }
}
    