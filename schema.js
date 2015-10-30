module.exports = function(mongoose) {
  var userSchema = new mongoose.Schema({
  firstname : {type: String, required: true, unique: true},
  lastname : {type: String, required: true, unique: true},
  role : {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
  });

  var documentSchema = new mongoose.Schema({
  title : {type: String, required: true, unique: true},
  publishedDate : {type: Date, required: true},
  accessRole : String,
  createdAt: { type: Date, default: Date.now }
  });

  var roleSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    createdAt: { type: Date, default: Date.now }
  });

  var models = {
    User : mongoose.model('User', userSchema),
    Document : mongoose.model('Document', documentSchema),
    Role : mongoose.model('Role', roleSchema)
  };
  return models;
}
