/** @type {import('next').NextConfig} */
const { i18n: basei18n } = require('./next-i18next.config');

const { omit } = require('ramda');

const i18n = omit(['localePath'], basei18n);

const webpack = (config) => {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  });

  return config;
};

const nextConfig = {
  i18n,
  webpack,
  reactStrictMode: true,
};

module.exports = nextConfig;
