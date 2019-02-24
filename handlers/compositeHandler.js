let DefaultHandler = require('./defaultHandler.js');

class CompositeHandler extends DefaultHandler{
  constructor() {
    super()
    this.allHandlers = [];
  }
  addHandler(handler){
    this.allHandlers.push(handler);
  }
  execute(req,res){
    let index = 0;
    while(!res.finished && index<this.allHandlers.length){
      this.allHandlers[index].execute(req,res);
      index++;
    }
  }
}

module.exports = CompositeHandler;
