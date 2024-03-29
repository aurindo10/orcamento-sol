/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./pages/env/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: false, // THIS IS THE FLAG THAT MATTERS
  },
  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
};
export default config;
