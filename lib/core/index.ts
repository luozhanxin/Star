import Koa from "koa";
import path = require("path");
import { deepMerge } from "./utils/tools";
import { App } from "./types";

type Params = {
  appPath: string;
};

export default async function Star(params: Params) {
  const app: App = new Koa() as App;
  const { appPath } = params;
  app.appPath = appPath;

  // get all config
  const env = process.env.NODE_ENV;
  const extName = (app.extName = env === "development" ? ".ts" : ".js");
  const baseConfig = await import(
    path.join(appPath, `config/config.base${extName}`)
  );
  const curConfig = await import(
    path.join(appPath, `config/config.${env}${extName}`)
  );

  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));
}
