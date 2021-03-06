const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps({
  env: {
    SENTRY_DSN: 'http://e69fa8afd38e43e59fc3baf48ec0c681@localhost:9000/11'
  },
  webpack: (config, options) => {
    /**
     * 在 _app.js 引入 @sentry/node 包，当项目运行的时候，如果是 SSR 渲染，
     * 则运行环境是 Node.js，而如果是客户端异常，也就是运行在浏览器端的时候，
     * 使用 webpack 将 @sentry/node 替换为 @sentry/browser
     * 可行的原因是因为 Next.js 的独特执行机制，它会在 server 端和 client 端
     * 分别运行一次 webpack 函数，所以在 browser 的时候替换即可
     */
    if (!options.isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }

    return config
  },
})
