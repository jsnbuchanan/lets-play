
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

  /**
   * @returns {*} Retrieves the next unbroken egg in the cache. If all eggs have been broken will return undefined.
   */
  get() {
    while (this._eggs.length > 0) {
      const egg = this._eggs.shift()
      if (egg.isNotBroken()) {
        return egg;
      }
    }
  }
}

module.exports = EggCache;