const User = require('../src/user.js').User;
const assert = require('chai').assert;

describe('User',()=>{
  describe('addTodo()',()=>{
    it('adds a todo having title,description',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      let expectedTodos = [{_title:'buy',_description:'milk',_items:[]}]
      assert.deepEqual(userTodo,expectedTodos);
    })
  })
  describe('todos',()=>{
    it('gives all the todos',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      let expectedTodos = [{_title:'buy',_description:'milk',_items:[]}]
      assert.equal(user.todos,'[{"_title":"buy","_description":"milk","_items":[]}]');
    })
  })
  describe('addItem()',()=>{
    it('adds a item given index of todo',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      user.addItem(0,'go to shop');
      let expectedTodos = '[{"_title":"buy","_description":"milk","_items":["go to shop"]}]';
      assert.equal(user.todos,expectedTodos);
    })
  })
  describe('getItems()',()=>{
    it('gives items of a particular todo given its index',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      user.addItem(0,'go to shop');
      let expectedItems = '["go to shop"]';
      assert.equal(user.getItems(0),expectedItems);
    })
  })
  describe('deleteTodo()',()=>{
    it('deletes a todo given its index',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      let expectedTodos = [{_title:'buy',_description:'milk',_items:[]}]
      assert.deepEqual(userTodo,expectedTodos);
      user.deleteTodo(0);
      assert.equal(user.todos,'[]');
    })
  })
  describe('deleteItem()',()=>{
    it('deletes an item given index of item and todo',()=>{
      let user = new User("alok");
      let userTodo = user.addTodo('buy','milk');
      user.addItem(0,'go to shop');
      let expectedItems = '["go to shop"]';
      assert.equal(user.getItems(0),expectedItems);
      user.deleteItem(0,0);
      assert.equal(user.todos,'[{"_title":"buy","_description":"milk","_items":[]}]');
    })
  })
})
