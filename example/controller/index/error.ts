export default {
  method: "GET",
  handler: async (ctx) => {
    try {
      throw Error("this is a error");
    } catch (error) {
      await ctx.render("500", { error });
    }
  },
};
