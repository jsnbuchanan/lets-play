/**
 * Creates a building and sets at random the first floor at which the egg will break.
 */
class Building {

  /**
   * Returns a Building, with a random the first floor at which the egg will break.
   *
   * Floors start at one, with `floorCount` being the top floor.
   *
   * @param floorCount total number of floors
   * @returns {Building} a Building, with a random the first floor at which the egg will break.
   */
  static with(floorCount= 100) {
    return new Building(floorCount);
  }

  /**
   * Constructor for creating a building with `floorCount` floors
   *
   * @param floorCount is the number of floors this building should have
   */
  constructor(floorCount) {
    this._UNBROKEN = 0;
    this._BROKEN = 1;

    this._topFloor = floorCount;
    this._firstBreak = Math.floor(Math.random() * floorCount)+1;
    this._floors = new Array(floorCount);

    // Populate floor drop results
    for (let floor = 0; floor < floorCount; floor++) {
      this._floors[floor] = floor+1 < this._firstBreak ? this._UNBROKEN : this._BROKEN;
    }
  }

  _survived(floorIndex) {
    return this._floors[floorIndex] === this._UNBROKEN;
  }

  /**
   * Checks to see if an egg would survive when dropped from this floor.
   *
   * @param floor number to check for drop results
   * @returns {boolean} true if the egg had survived being dropped from this floor
   */
  survivedDrop(floor) {
    if (floor < 1) throw new Error("What are you? A gopher? This building has no basement. You attempted to go below floor one.");
    if (floor > this._topFloor) throw new Error("I know your mother thinks you're an angel, but you cannot reach a higher floor without wings. You attempted to go beyond the top floor.");
    return this._survived(floor - 1);
  }

  /**
   * Returns an ascii cheat sheet of what the building looks like with egg drop results
   * and where the egg will break.
   *
   * @returns {string} an ascii cheat sheet of where the egg will break.
   */
  cheatSheet() {
    return this.toString() + `  Egg will break at floor ${this._firstBreak}!`;
  }

  /**
   * Returns an ascii representation of what the building looks like with egg drop results.
   *
   * @returns {string} an ascii representation of the building
   */
  toString() {
    const splatAscii = "#+_ splat _+#";
    const roofAscii =     '  .--------------------------.\n';
    const midFloorAscii = '  |--------------------------|\n';
    const floorOneAscii =  '  |    [] []  |||  [] []     |\n';
    const streetAscii =   "--'-----------'-'------------'--\n";
    const stepsAscii  =   "================================\n";
    const survived = " ".repeat(splatAscii.length);
    const formatFloorNumber = (floorNumber) => (floorNumber).toString().padEnd(4);
    const getFloorAscii = (floorNumber, result) => `  | floor ${formatFloorNumber(floorNumber)} ${result} |  \n`;

    let buildingAscii = roofAscii;
    for (let floor = this._topFloor - 1; floor > -1; floor--) {
      const floorNumber = floor + 1;
      const result = this._survived(floor) ? survived : splatAscii;
      buildingAscii += getFloorAscii(floorNumber, result);
      buildingAscii += floor === 0 ? floorOneAscii : midFloorAscii;
    }
    buildingAscii += streetAscii;
    buildingAscii += stepsAscii;
    return buildingAscii;
  }
}

module.exports = Building;