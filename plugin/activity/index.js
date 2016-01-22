'use strict';

const Async = require('async');
var Activity = require('../.././model/activity');

exports.register = function(server, options, next) {

  server.route({
      method : 'GET',
      path : '/activity',
      handler : function(req, reply){
          reply.view('activity');
      }
  });

  server.route({
      method : 'GET',
      path : '/activity/pie',
      handler : function(req, reply){

        Async.parallel([
            function countQR(callback){
              Activity.find().where({'name':'qr'}).count(function(err, count){
                callback(null, count);
              });
            },
            function countBeacon(callback){
              Activity.find().where({'name':'ibeacon'}).count(function(err, count){
                callback(null, count);
              });              
            },
             function countApp(callback){
              Activity.find().where({'name':'app'}).count(function(err, count){
                callback(null, count);
              });              
            }           
          ], 
          function(err, result){
            reply({
              qr : result[0],
              ibeacon : result[1],
              app : result[2]
            });
        });

      }
  });

  server.route({
      method : 'GET',
      path : '/activity/products',
      handler : function(req, reply){

        Activity.aggregate([
          { $group : {
            _id: '$products',
            count: {$sum : 1}
          } }
        ], function(err, count){
          reply({ data : count});
        });

      }
  });

  server.route({
      method : 'GET',
      path : '/activity/analytics/{type?}',
      handler : function(req, reply){
        const type = encodeURIComponent(req.params.type);
        var d = new Date();
        var start = new Date(d.getFullYear(), d.getMonth(), 1, 0, 0);
        var end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
        Activity.find().where({name:'qr'}).where({
          timeStamp : {
            $gte : Number(start),
            $lte : Number(end)
          }
        }).aggregate([{
          $group : {
            _id : '$dateStamp',
            count : {$sum : 1}
          }
        }], function(err, count){
          reply(couunt);
        });
      }
  });  

    // Callback, completes the registration process
    next();
}

exports.register.attributes = {
    name: 'touchdown', // Must be unique
    version: '1.0.0'
};
