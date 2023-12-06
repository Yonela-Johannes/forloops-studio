const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
  },
  async function (accessToken, refreshToken, profile, cb) {
    let data = profile?._json;
    const user = await User.findOne({ email: data.email });

    if (user) {
      await User.findOneAndUpdate({email: data.email}, {verified: true}, {new: true})
      return cb(null, user);
    } else {
      const newUser = await User.create({
        first_name: data.given_name,
        last_name: data.family_name,
        user_image: data.picture,
        cover: data.picture,
        password: data.email,
        email: data.email,
        verified: true,
        roles: "user",
      });
      return await cb(null, newUser)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
})
