var mongoose = require("mongoose");
var models = require("./schema")(mongoose);
var database = require("./index");

module.exports = {
  clearDbCollections: function(){
    return models.Role.remove({}, function(err, roleStatus){
      models.User.remove({}, function(err, userStatus){
        models.Document.remove({}, function(err, docStatus){
        });
      });
    });
  },

  createUser: function(first_name, last_name, user_role, callback){
    return models.User.create({firstname: first_name, lastname: last_name, role: user_role}, function(err, newUser){
      if(err) {
      callback(err);
      }else{
      return newUser;
    }
    });
	},

	getAllUsers: function(){
    return models.User.find(function (err, allUsers) {
      if (err) return console.error(err);
      return allUsers;
    });
	},

	createRole: function(role_title, callback){
    return models.Role.create({title: role_title}, function(err, newRole){
      if(err) {
        callback(err);
      }
      else { return newRole;}
    });
	},

	getAllRoles: function(){
    return models.Role.find(function (err, allRoles) {
      if (err) return console.error(err);
      return allRoles;
    });
	},

	createDocument: function(doc_title, pub_date, access_role){
    return models.Document.create({title: doc_title, publishedDate: pub_date, accessRole: access_role}, function(err, newDoc){
      if(err) return err;
      else return newDoc;
    });
	},

	getAllDocuments: function(limit_value){
    return models.Document.find({}).sort({'publishedDate': 1}).limit(limit_value)
    .exec(function(err, data) {
      if (err) console.error(err);
      else return data;
    });
	},

	getAllDocumentsByRole: function(doc_role, limit_value){
    return models.Document.find({accessRole: doc_role }).sort({'publishedDate': 1}).limit(limit_value)
    .exec(function(err, data) {
      if (err) return console.error(err);
      else return data;
    });
	},

	getAllDocumentsByDate: function(pub_date, limit_value){
    return models.Document.find({publishedDate: pub_date }).sort({'publishedDate': 1}).limit(limit_value)
    .exec(function(err, data) {
      if (err) return console.error(err);
      else return data;
    });
	}
}
