var xcss = require('xcss'),
    rework = require('rework'),
    dedupe = require('rework-deduplicate'),
    vars = require('rework-vars'),
    inherit = require('rework-inherit'),
    namespace = require('rework-namespace'),
    autoprefixer = require('autoprefixer'),
    read = require('fs-extra').readFileSync,
    exists = require('fs-extra').existsSync;

module.exports = function(options) {
    options = options || {};
    var src = options.src,
        dest = options.dest,
        license = options.license || '',
        ns = options.namespace || '',
        browsers = options.browsers || [],
        urlString = options.url || '',
        debug = options.debug || false,
        output;

    if (!exists(src)) {
        throw new Error("Sorry, I couldn't find an input file. Did you supply one?");
    }

    var transforms = [
      vars(),
      dedupe(),
      rework.colors(),
      inherit(),
      rework.url(function(url) {return urlString + url;}),
      namespace(ns),
      autoprefixer(browsers).rework
    ]

    return xcss(src, {transforms: transforms, debug: debug});
};
