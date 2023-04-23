import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default async (app) => {
  const proxy = async (config: AxiosRequestConfig) => {
    const { data, headers, status } = (await axios(config)) as AxiosResponse;

    // 返回 RESTful 规范
    return {
      code: status,
      status: status === 200 ? "success" : "fail",
      headers,
      data,
    };
  };

  app.use((ctx, next) => {
    ctx.proxy = proxy;

    return next();
  });
};
