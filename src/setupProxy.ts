import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://f68370a9-1a80-4b78-b83c-8cb61539ecd6.mock.pstmn.io",
      changeOrigin: true,
    })
  );
};
