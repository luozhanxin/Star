import { sign, decode } from "jsonwebtoken";
export default async (app) => {
  const loginConfig = app.config.login;
  const { secret, cookieOption } = loginConfig;
  if (loginConfig?.needLogin) {
    const checkLogin = (ctx, next) => {
      const token = ctx.cookies.get("star_token");
      if (!token) {
        const jwt = login();
        ctx.cookies.set("star_token", jwt, cookieOption);
        ctx.status = 302;
        ctx.redirect(ctx.url);
      } else {
        const user = decode(token);
        if (user) {
          ctx.user = user;
        }
        return next();
      }
    };

    // TODO
    const login = () => {
      const jwt = sign({ username: "star" }, secret, { expiresIn: "1h" });
      return jwt;
    };

    app.use(checkLogin);
  }
};
