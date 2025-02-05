'use strict';
const { defineAbilityFor } = require('./abilities');
const { rulesToQuery,rulesToAST }  = require('@casl/ability/extra');

module.exports = app => {
  app.router.get('/a', mustRead("/a"), function() {
    let ctx = this
    ctx.body = "read"
  });

  app.router.post('/b', mustWrite("/b"), function() {
    let ctx = this
    ctx.body = "write"
  });

  app.router.get('/c', mustAdmin("/c"), function() {
    let ctx = this
    ctx.body = "admin"
  });
};

function mustAdmin(path) {
  return  (ctx, next) => { 
    let user = {
      name:"jimmy",
      email:"email",
      password:"123",
      role:"admin"
    } 
    let rules = defineAbilityFor(user)
    if (!rules.can('admin', path)){
        ctx.status = 400
        ctx.body = "no auth"
        return 
    }

    next()
  }
}


function mustWrite(path) {
  return  (ctx, next) => { 
    let user = {
      name:"jimmy",
      email:"email",
      password:"123",
      role:"write"
    } 
    let rules = defineAbilityFor(user)
    if (!rules.can('write', path)){
        ctx.status = 400
        ctx.body = "no auth"
        return 
    }

    next()
  }
}

function mustRead(path) {
  return  (ctx, next) => { 
    let user = {
      name:"jimmy",
      email:"email",
      password:"123",
      role:"write"
    } 
    let rules = defineAbilityFor(user)


    const x = rules.rulesFor('read',path);
    console.log(x)

    const query = rulesToQuery(rules,  'read',path);
    console.log(query)

    const ast = rulesToAST(rules,  'read',path);
    console.log(ast)

    if (!rules.can('read', path)){
        ctx.status = 400
        ctx.body = "no auth"
        return 
    }

    next()
  }
}