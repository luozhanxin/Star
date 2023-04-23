import Router from "koa-router";
const router = new Router();

router.prefix("/index");
router.get("/hi", (ctx, next) => {
  ctx.body = "hi,star is run";
});

export default router;
