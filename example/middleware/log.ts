export default (app) => {
  return (ctx, next) => {
    console.log(ctx.request.path);
    return next();
  };
};
