describe("Document Management System", function() {
  var docMgr = require("./documentManager");
  var database = require("./index");
  //clear database collections before all specs
  docMgr.clearDbCollections();

  describe("Roles", function() {

    it("should create new Role", function(done) {
      docMgr.createRole('Security').then(function(role){
        expect(role['title']).toBe('Security');
        done();
      });
    });

    it("should create new Role", function(done) {
      docMgr.createRole('Manager').then(function(role){
        expect(role['title']).toBe('Manager');
        done();
      });
    });

    it("should get all Roles", function(done) {
      docMgr.getAllRoles().then(function(roles){
        expect(roles[0]['title']).toBe('Security');
        expect(roles[1]['title']).toBe('Manager');
        expect(roles.length).toEqual(2);
        done();
      });
    });

    it("show that new Role title is unique", function(done) {
      docMgr.createRole('Manager', function(err){
          expect(Number(err.code)).toBe(11000);
          done();
        });
    });
  });

  describe("Users", function() {

    it("createUser should create new Users", function(done) {
      docMgr.createUser('First', 'User', 'Security').then(function(userOne){
        expect(userOne.firstname).toBe('First');
        expect(userOne.lastname).toBe('User');
        expect(userOne.role).toBe('Security');
      });
      docMgr.createUser('Second', 'Person', 'Manager').then(function(user){
        expect(user.firstname).toBe('Second');
        expect(user.lastname).toBe('Person');
        expect(user.role).toBe('Manager');
        done();
      });
    });

    it("show that created Users are unique", function(done) {
      docMgr.createUser('First', 'User', 'Security', function(err){
        expect(Number(err.code)).toBe(11000);
        done();
      });
    });

    it("getAllUsers should return all Users", function(done) {
      docMgr.getAllUsers().then(function(users){
        expect(users[0].firstname).toBe('First');
        expect(users[1].firstname).toBe('Second');
        expect(users.length).toEqual(2);
        done();
      });
    });
  });

  describe("Documents", function() {

    it("createDocument should create a new Document", function(done) {
      docMgr.createDocument('The Hobbit', '2010-12-09', 'Security').then(function(doc){
        expect(doc['title']).toBe('The Hobbit');
        done();
      });
    });

    it("createDocument should create a new Document", function(done) {
      docMgr.createDocument('The Spy', '2010-12-09', 'Manager').then(function(doc){
        expect(doc['title']).toBe('The Spy');
        done();
      });
    });

    it("should return all Documents", function(done) {
      docMgr.getAllDocuments(5).then(function(docs){
        expect(docs.length).toEqual(2);
        done();
      });
    });
  });

  describe("Search", function() {

    it("should return all Documents by Role", function(done) {
      docMgr.getAllDocumentsByRole('Manager', 5).then(function(docs){
        expect(docs[0]['title']).toBe('The Spy');
        expect(docs.length).toEqual(1);
        done();
      });
    });

    it("should return all Documents by Date", function(done) {
      docMgr.getAllDocumentsByDate('2010-12-09', 1).then(function(docs){
        expect(docs[0]['title']).toBe('The Hobbit');
        expect(docs.length).toEqual(1);
        done();
      });
      //clear database collection after all specs
      docMgr.clearDbCollections();
    });
  });

});
