const passport = require("passport");
const User = require("./models/user");

const GOOGLE_CLIENT_ID =
  "792272981991-tq2dgn4o24hrdrv5rvqashv7uung1rba.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });

      if (profile.emails[0].value.indexOf("vitstudent.ac.in") == -1) {
        return done(null, null);
      }
      await User.findOrCreate({
        name: profile.displayName,
        email: profile.emails[0].value,
        img: profile.photos[0].value,
      });
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
