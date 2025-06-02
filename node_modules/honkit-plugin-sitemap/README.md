# Sitemap Generator for Honkit

Generate a sitemap for the Honkit Documentation. The output sitemap file is `sitemap.xml` and copied automatically.

This updates some older versions of this plugin from Gitbook to the modern era.

## Install

```sh
npm install honkit-plugin-sitemap --save-dev
```

## Usage

Add it to your `book.json` with a basic configuration:

```json
{
    "plugins": ["sitemap"],
    "pluginsConfig": {
        "sitemap": {
            "url": "https://example.com"
        }
    }
}
```

If you use a prefix for your domain use...

```json
"pluginsConfig": {
    "sitemap": {
        "url": "https://example.com",
        "pathSuffix": "/yourSuffix/"
    }
}
```
