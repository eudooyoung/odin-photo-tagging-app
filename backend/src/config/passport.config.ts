import {
  findUserById,
  findUserByUsername,
} from "@/repositories/user.repository.js";
import type { AuthUser } from "@/types/auth.types.js";
import bcrypt from "bcryptjs";
import passportInstance from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passportInstance.use(
  new LocalStrategy((username, password, done) => {
    void (async () => {
      try {
        const user = await findUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid username or password" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Invalid username or password" });
        }
        const authUser: AuthUser = {
          id: user.id,
          username: user.username,
        };
        return done(null, authUser);
      } catch (err) {
        return done(err);
      }
    })();
  }),
);

passportInstance.serializeUser((user, done) => {
  done(null, user.id);
});

passportInstance.deserializeUser((userId: number, done) => {
  void (async () => {
    try {
      const user = await findUserById(userId);
      const authUser = { id: user.id, username: user.username };
      done(null, authUser);
    } catch (err) {
      done(err);
    }
  })();
});

export const passport = passportInstance;
