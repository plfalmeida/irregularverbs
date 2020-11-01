const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    images: {
        domains: [
            'images.unsplash.com',
            'source.unsplash.com',
        ]
    }
}