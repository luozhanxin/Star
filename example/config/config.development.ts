import path from "path";
export default (app) => {
  return {
    devServer: {
      port: 8888,
    },
    // file | koa-router
    router: "file",
    // koa-static
    static: {},
    // cors
    cors: {
      origin: "http://127.0.0.1:4000",
      maxAge: 0,
    },
    middlewares: ["log"],
    // TODO: fix
    login: {
      needLogin: false,
      secret: "my_secret",
      cookieOption: {
        path: "/user/getInfo",
        domain: "http://127.0.0.1",
      },
    },
    view: {
      // ejs | pug
      extension: "ejs",
    },
    redis: {
      port: 6378,
      host: "127.0.0.1",
      password: "",
    },
    //mysql: {
    //  host: "localhost",
    //  port: 3306,
    //  user: "root",
    //  password: "",
    //  database: "",
    //},
    //elasticsearch: {
    //  host: "localhost:9200",
    //},
    log: {
      dir: path.join(__dirname, "../log"),
    },
    mock: {
      prefix: "",
    },
  };
};
