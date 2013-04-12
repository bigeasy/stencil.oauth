var connect = require('connect'),
    service = require('stencil/service'),
    path = require('path'),
    fs = require('fs');

function createStencil () {
  var stencils = path.join(__dirname, 'public/stencils'),
      javascript = require('stencil/javascript/common').create(stencils),
      xml = require('stencil/xml/file').create(stencils),
      json = require('stencil/json/file').create(stencils),
      context = require('stencil').create(javascript, xml, json);
  return service.create(stencils, context);
}

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(connect.urlencoded())
  .use(createStencil())
  .listen('8389');

require("fs").writeFileSync("server.pid", process.pid + "\n", "utf8");
console.log("starting: " + process.pid);
