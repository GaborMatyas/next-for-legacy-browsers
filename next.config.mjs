/** @type {import('next').NextConfig} */
import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin";
import withTMInitializer from "next-transpile-modules";
import withPlugins from "next-compose-plugins";

const withTM = withTMInitializer([
  "@coralogix/browser",
  "@coralogix/browser/node_modules/arg",
  "uuid",
  "@coralogix/browser/node_modules/ts-node",
  "@coralogix/browser/node_modules/tslib",
]);
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    externalDir: true,
  },
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };

    if (!isServer) {
      config.plugins.push(new RetryChunkLoadPlugin());
    }

    config.optimization.splitChunks = {
      chunks: "all",
      cacheGroups: {
        yalc: {
          test: /[\\/].yalc[\\/]/,
          name: "yalc",
          chunks: "all",
        },
      },
      maxInitialSize: 1000000,
    };
    return config;
  },
};

export default withPlugins([withTM], nextConfig);
// export default nextConfig;
