export default {
  "GET /user/list": [
    {
      id: 1,
    },
  ],
  "GET /user/getInfo": (ctx) => {
    return {
      id: 1,
      username: "sky",
      age: 22,
      gender: "0",
    };
  },
};
