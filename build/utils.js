function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
        loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, {
                sourceMap: options.sourceMap
            })
        })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader',
            publicPath: '../../' //add
        })
    } else {
        return ['vue-style-loader'].concat(loaders)
    }
}