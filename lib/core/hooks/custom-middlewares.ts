import path from "path";

export default async (app) => {
  const { middlewares } = app.config;

  for (let m of middlewares) {
    const curMiddleWarePath = path.resolve(
      app.appPath,
      "./middleware",
      `${m}${app.extName}`
    );

    const curMiddleware = await import(curMiddleWarePath);
    app.use(curMiddleware.default(app));
  }
};
