const WebApp = require('./webapp.js');;
const appLib = require('./appLib.js');
const registered_users = [{'userName':'Aditi','password':'1'},{'userName':'Nitesh','password':'2'}];
const CompositeHandler = require('./handlers/compositeHandler.js');
const StaticFileHandler = require('./handlers/staticFileHandler.js');
const PostLogoutHandler = require('./handlers/postLogoutHandler.js');

let compositeHandler = new CompositeHandler();
let staticFileHandler = new StaticFileHandler('public');
let postLogoutHandler = new PostLogoutHandler();

compositeHandler.addHandler(staticFileHandler);

const redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home');
}
const redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/','/home','/logout']) && !req.user) res.redirect('/login');
}
const loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const postLoginAction = function(req,res){
  let validUser = registered_users.find((u)=>u.userName==req.body.name);
  let validPassword = registered_users.find((u)=>u.password==req.body.password);
  if(!validUser || !validPassword){
    res.setHeader('Set-Cookie',`message=login Failed ; Max-Age=5`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  validUser.sessionid = sessionid;
  res.redirect('/home');
}

const getUserName = function(req){
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  let userName = user['userName'];
  return userName;
}

const onDataRequest = function(req,res){
  let userName = getUserName(req);
  let todo = req.body;
  let todos = appLib.users[userName].todos;
  if(todo.title!='' && todo.description!=''){
    appLib.users[userName].addTodo(todo.title,todo.description);
    todos = appLib.users[userName].todos;
    res.write(todos);
    writeToFile();
    res.end();
    return;
  }
  res.write(todos);
  res.end();
}

const onDelete = function(req,res){
  let todoIndex = req.body.id;
  let userName = getUserName(req);
  appLib.users[userName].deleteTodo(todoIndex);
  let todos = appLib.users[userName].todos;
  res.write(todos);
  writeToFile();
  res.end();
}

const deleteItem = function(req,res){
  let todoIndex = req.body.todoIndex;
  let itemIndex = req.body.itemIndex;
  let userName = getUserName(req);
  appLib.users[userName].deleteItem(todoIndex,itemIndex);
  let items = appLib.users[userName].getItems(todoIndex);
  res.write(items);
  writeToFile();
  res.end();
}


const addItem = function(req,res){
  let item = req.body.item;
  let index = req.body.index;
  let userName = getUserName(req);
  let items = appLib.users[userName].getItems(index);
  if(item!=""){
    appLib.users[userName].addItem(index,item);
    items = appLib.users[userName].getItems(index);
    writeToFile();
    res.write(items);
    res.end();
    return;
  }
  res.write(items);
  res.end();
}

let app = WebApp.create();
let loadFileData = appLib.loadFileData.bind(app);
let writeToFile = appLib.writeToFile.bind(app);
let logRequest = appLib.logRequest.bind(app);
app.use(logRequest);
app.use(loadUser);
app.use(loadFileData);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);
app.use(compositeHandler.getRequestHandler());

app.post('/onDataRequest',onDataRequest);
app.post('/login',postLoginAction);
app.post('/onDelete',onDelete);
app.post('/deleteItem',deleteItem);
app.post('/addItem',addItem);
app.post('/logout',postLogoutHandler.getRequestHandler());
module.exports = app;
