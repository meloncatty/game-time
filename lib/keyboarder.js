class Keyboarder {
  constructor() {
    this.keys = {
      left: 37,
      right: 39,
    }
  }
  keyDown(e) {
    var keyState = {};
    if (e.keyCode === 37) {
      keyState.left = true;
    } else if (e.keyCode === 39) {
      keyState.right = true;
    };
    return keyState;
  };

  keyUp(e) {
    var keyState = {};
    if (e.keyCode === 37) {
      keyState.left = false;
    } else if (e.keyCode === 39) {
      keyState.right = false;
    };
    return keyState;
  };

}

module.exports = Keyboarder;
