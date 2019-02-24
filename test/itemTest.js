const Item = require('../src/item.js').Item;
const assert = require('chai').assert;

describe('Item',()=>{
  describe('status',()=>{
    it('gives current status of the Item as Undone by default',()=>{
      let item = new Item({});
      assert.notOk(item.status);
    })
    it('gives status as true of the item as done after setting it',()=>{
      let item = new Item({});
      item.markDone();
      assert.ok(item.status);
    })
    it('gives status as false of the item as Undone after setting it',()=>{
      let item = new Item({});
      item.markUndone();
      assert.notOk(item.status);
    })
  })
  describe('get item()',()=>{
    it('gives the item',()=>{
      let item = new Item({});
      assert.deepEqual(item.item,{});
    })
  })
})
