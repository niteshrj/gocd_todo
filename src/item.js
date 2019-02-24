class Item {
  constructor(item) {
    this._item = item;
    this._status = false;
  }
  get item(){
    return this._item;
  }
  get status(){
    return this._status;
  }
  markDone(){
    this._status = true;
  }
  markUndone(){
    this._status = false;
  }
}

exports.Item = Item;
