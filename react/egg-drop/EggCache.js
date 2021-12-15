
class Egg {
  constructor() {
    this._broken = false;
  }

  isBroken() {
    return this._broken;
  }

  isNotBroken() {
    return !this._broken;
  }

  break() {
    this._broken = true;
  }
}

class EggCache {
  static get(eggCount = 2) {
    return new EggCache(eggCount);
  }

  constructor(eggCount = 2) {
    this._eggs = new Array(eggCount);
    for (let i = 0; i < eggCount; i++) {
      this._eggs[i] = new Egg();
    }
  }

  *[Symbol.iterator]() {
    for(const egg of this._eggs) {
      if (egg.isNotBroken()) {
        yield egg;
      }
    }
  }
}

module.exports = EggCache;