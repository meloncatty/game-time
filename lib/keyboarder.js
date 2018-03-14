class Keyboarder {
  constructor() {
    this.keys = {
      left: 37, 
      right: 39,
    } 
  }
  listen(e) {
    var keyState = {};
    if (e.keyCode === 37) {
      keyState.left = true;
    } else if (e.keyCode === 39) {
      keyState.right = true;
    };
    return keyState;
  }; 
}

module.exports = Keyboarder;