import Koa from "koa";
import path = require("path");
import { deepMerge, getHooks } from "./utils";
import { App, Hook } from "./types";
const hooks = ["lift"];

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

  // get all hooks
  const allHooks: Hook[] = await getHooks(hooks);
  for (const hook of allHooks) {
    try {
      await hook.default(app);
    } catch (error) {}
  }

  console.log(app.config);

  // catch error
  app.on("error", (error) => {});
}
