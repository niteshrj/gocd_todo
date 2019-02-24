let chai = require('chai');
let assert = chai.assert;

let testHelper = {};

testHelper.should_be_redirected_to = (res,location)=>{
  assert.equal(res.statusCode,302);
  assert.equal(res.headers.location,location);
};

testHelper.status_is_ok = (res)=>assert.equal(res.statusCode,200);

testHelper.content_type_is = (res,expected)=> assert.equal(res.headers['Content-Type'],expected);

testHelper.body_contains = (res,text)=> assert.isOk(res.body.includes(text),`missing ${text}`);

testHelper.body_does_not_contain = (res,text)=> assert.isNotOk(res.body.includes(text),`missing ${text}`);

testHelper.should_not_have_cookie = (res,name)=> {
  let cookieText = res.headers['Set-Cookie']||'';
  assert.notInclude(cookieText,`${name}=`);
};

testHelper.should_have_cookie = (res,name,value)=> {
  let cookieText = res.headers['Set-Cookie'];
  assert.include(cookieText,`${name}=${value}`);
};

testHelper.should_have_expiring_cookie = (res,name,value)=> {
  let cookieText = res.headers['Set-Cookie'];
  assert.include(cookieText,`${name}=${value}; Max-Age=5`);
};

module.exports = testHelper;
