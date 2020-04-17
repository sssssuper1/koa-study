const fs = require('fs');

function resolveControllers(router, dir) {
  const files = fs.readdirSync(__dirname + '/' + dir);
  const js_files = files.filter(file => file.endsWith('.js'));

  for (let f of js_files) {
    console.log(`processing controller: ${f}`);
    let mapping = require(__dirname + '/controllers/' + f);
    registerRouter(router, mapping);
  }
}

function registerRouter(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      const path = url.slice(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST')) {
      const path = url.slice(5);
      router.post(path, mapping[url]);
    } else {
      console.log(`invalid url: ${url}`);
    }
  }
}

module.exports = function(dir = 'controllers') {
  const router = require('koa-router')();
  resolveControllers(router, dir);
  return router.routes();
}