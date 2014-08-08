var traceur = require('traceur');
// traceur.require.makeDefault(function(filename) {
//     // don't transpile our dependencies, just our app
//     return filename.indexOf('node_modules') === -1;
// }, {
//     experimental: true
// });
require('node-jsx').install({
    additionalTransformAfter: function(src, filename) {
        var res = traceur.compile(src, {
            filename: filename,
            sourceMaps: true,
            experimental: true
        });

        if (res.errors && res.errors.length) {
            console.log(res.errors);
            throw new Error(filename + ' ERROR');
        }

        return res.js || '';
    },
    sourceMap: true,
    extension: '.jsx'
});

require('./init.jsx');