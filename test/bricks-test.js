const chai = require('chai');
const assert = chai.assert;
const Brick = require('../lib/bricks');

describe('Brick', function() {
  it('should be a constructor', function() {
    assert.isFunction(Brick, true);
  })

  it('should instantiate a new brick', function() {
    var brick = new Brick(5, 5);
    assert.isObject(brick);
  })

  it('should have an x and y value, and an empty bricks array', function() {
    var brick = new Brick(5, 5);
    assert.equal(brick.x, 5);
    assert.equal(brick.y, 5);
    assert.deepEqual(brick.bricks, []);
  });

  it('should create a lot of bricks', function() {
    var brick = new Brick(5, 5);
    brick.createBricks();
    assert.equal(brick.bricks.length, 20);
  })

})
