const sm = require('sitemap');
const urls = [];

function handlePageHook(page) {
    if (this.output.name != 'website') {
        return page;
    }

    const lang = this.isLanguageBook() ? this.language : '';
    if (lang) {
        lang = lang + '/';
    }

    const pathSuffix = this.config.get('pluginsConfig.sitemap.pathSuffix', '');
    let url = this.output.toURL(pathSuffix + lang + page.path);
    if (url.startsWith('./')) {
        url = '';
    }

    urls.push({ url });
    return page;
}

function handleFinishHook() {
    const currentURL = new URL('/', this.config.get('pluginsConfig.sitemap.url'));

    const sitemap = sm.createSitemap({
        cacheTime: 600000,
        hostname: currentURL.href,
        urls: urls,
    });

    const xml = sitemap.toString();
    return this.output.writeFile('sitemap.xml', xml);
}

module.exports = {
    hooks: {
        page: handlePageHook, // Called before running the templating engine on the page.
        finish: handleFinishHook, // Called after everything is completed.
    },
};
