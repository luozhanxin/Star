import glob from "glob";
import path from "path";

export default async (app) => {
  const mockConfig = app.config.mock || {};

  if (!!Object.keys(mockConfig).length) {
    const mockPath = path.resolve(app.appPath, "./mock", `*${app.extName}`);
    let mockMap = {};

    glob.sync(mockPath).forEach(async (path) => {
      const mock = await import(path);

      if (!Object.keys(mock.default).length) return;

      Object.keys(mock.default).forEach((key) => {
        mockMap[key] = mock.default[key];
      });
    });

    app.use((ctx, next) => {
      const { method, path } = ctx;
      const key = `${method} ${mockConfig.prefix}${path}`;

      if (mockMap[key]) {
        if (typeof mockMap[key] === "function") {
          ctx.body = mockMap[key](ctx);
          return;
        }
        ctx.body = mockMap[key];
        return;
      }
      return next();
    });
  }
};
