class Scores {
  constructor(score, initials){
    this.score = score;
    this.initials = initials;
    this.id = Date.now();
  }
}

module.exports = Scores;
