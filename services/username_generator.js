var User = require('../models/User');

function ensure_minimum_length(str){
  if(str.length < 7){
    var n = 7 - str.length;
    var extra = '1';
    var i;
    for(i = 1; i < n; i++){
      extra = extra + '0';
    }
    str = str + extra;
  }
  return str;
}

var username_generator = function(str, callback){
  str = str.trim();
  str = str.toLocaleLowerCase();
  str = str.replace(/[^a-z]/g,'');
  str = str.trim();
  str = str.replace(/\^/g,'');
  var pattern = '^'.concat(str);
  User.find({ "username": { "$regex": pattern, "$options": "i" } }, function(err, docs){
    if(err){
      console.log(err);
      callback(null);
    } else {
      if(docs.length === 0){
        str = ensure_minimum_length(str);
        callback(str);
      } else {
        var max = 0;
        var str_array = docs.map(a => a.username);
        str_array = str_array.sort();
        str_array.forEach((username) => {
          var x = username.slice(str.length, username.length);
          if(/^\d+$/.test(x)){
            if(Number(x) > max){
              max = Number(x);
            }
          }
        });
        max = (max + 1).toString();
        if((max.length + str.length) < 7){
          str = ensure_minimum_length(str);
        } else {
          str = str.concat(max);
        }
        callback(str);
      }
    }
  });
}

module.exports = username_generator;
