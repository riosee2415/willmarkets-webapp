const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          if (email.includes(`ISCLIENT&&`)) {
            const languaue = email.split(`&&`)[1];
            console.log(email);
            const user = await User.findOne({
              where: { email: email.split(`&&`)[2] },
            });
            if (!user) {
              return done(null, false, {
                reason:
                  languaue === "ko"
                    ? "존재하지 않는 이메일 입니다."
                    : "This email does not exist.",
              });
            }

            if (!user.isComplete) {
              return done(null, false, {
                reason:
                  languaue === "ko"
                    ? "관리자 승인 후 로그인 할 수 있습니다."
                    : "You can log in after administrator approval.",
              });
            }

            const result = await bcrypt.compare(password, user.password);

            if (result) {
              return done(null, user);
            }

            return done(null, false, {
              reason:
                languaue === "ko"
                  ? "비밀번호가 일치하지 않습니다."
                  : "Passwords do not match.",
            });
          } else {
            const user = await User.findOne({
              where: { email },
            });
            if (!user) {
              return done(null, false, {
                reason: "존재하지 않는 이메일 입니다.",
              });
            }

            if (!user.isComplete) {
              return done(null, false, {
                reason: "관리자 승인 후 로그인 할 수 있습니다.",
              });
            }

            const result = await bcrypt.compare(password, user.password);
            if (result) {
              return done(null, user);
            }

            return done(null, false, {
              reason: "비밀번호가 일치하지 않습니다.",
            });
          }
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
