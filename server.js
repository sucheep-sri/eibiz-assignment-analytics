'use strict';
const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Inert = require('inert');
const Good = require('good');
const Mongoose = require('mongoose');

/*
Mongoose.connect('mongodb://192.168.88.204/beacondb', function(err){
  if(err){
    console.log('DB connection error : ' + err);
  }
});
*/
Mongoose.connect('mongodb://localhost/android', function(err){
  if(err){
    console.log('DB connection error : ' + err);
  }
});

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port : 80, routes: { cors: true } });
server.register(Inert, function () {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('ejs')
        },
        path: './views'
    });

});


const plugins = [
  { register : require('./plugin/activity') },
  {
      register: Good,
      options: {
          reporters: [{
              reporter: require('good-console'),
              events: {
                  response: '*',
                  log: '*'
              }
          }]
      }
  }
];

server.register( plugins, (err) => {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(() => {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
