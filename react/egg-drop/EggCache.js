
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
  static of(eggCount = 2) {
    return new EggCache(eggCount);
  }

  constructor(eggCount = 2) {
    this._eggs = new Array(eggCount);
    for (let i = 0; i < eggCount; i++) {
      this._eggs[i] = new Egg();
    }
  }

  get() {
    for (const egg of this._eggs) {
      if (egg.isNotBroken()) {
        return egg;
      }
    }
    throw Error("All eggs are broken.");
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