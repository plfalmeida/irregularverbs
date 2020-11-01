const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    assetPrefix: isProd ? 'http://artemis.rec.br/nextjs/' : '',
    images: {
        domains: [
            'images.unsplash.com',
            'source.unsplash.com',
        ]
    }
}