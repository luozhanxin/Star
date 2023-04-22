export default async (app) => {
  const port = app.config.devServer.port;
  app.listen(port, () => {
    printLogo();
    log(`Server port ${c.cyan}localhost:${port}${c.end}`);
    app.redisConMsg && log(app.redisConMsg);
    app.mysqlConMsg && log(app.mysqlConMsg);
    app.esConMsg && log(app.esConMsg);
    log("To shut down, press <CTRL> + C at any time.\n");
  });
};

const log = (message) => process.stdout.write(message + "\n");
const c = { cyan: "\x1b[36m", red: "\x1b[31m", end: "\x1b[39m" };
const printLogo = () =>
  log(`${c.cyan}
　　　　－－－　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
     ／＿＿＿＼
　 　 |  STAR  |
     ＼＿＿＿／
　　　　－－－
${c.end}`);
