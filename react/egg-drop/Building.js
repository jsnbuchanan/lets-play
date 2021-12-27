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

    this._dropAttempts = 0;
    this._topFloor = floorCount;
    this._firstBreak = Math.floor(Math.random() * floorCount)+1;
    this._floors = new Array(floorCount);
    this._survived = (floorIndex) => this._floors[floorIndex] === this._UNBROKEN;

    // Populate floor drop results
    for (let floor = 0; floor < floorCount; floor++) {
      this._floors[floor] = floor+1 < this._firstBreak ? this._UNBROKEN : this._BROKEN;
    }
  }

  /**
   * @returns {number} the number of floors in this building
   */
  getFloorCount() {
    return this._topFloor;
  }

  /**
   * Checks to see if an egg would survive when dropped from this floor.
   *
   * @param egg to drop fromFloor number
   * @param fromFloor number to check for drop results
   * @returns {boolean} true if the egg had survived being dropped from this floor
   */
  drop(egg, fromFloor) {
    this._dropAttempts++
    if (fromFloor < 1) throw new Error("You attempted to access a floor below street level. This building has no basement. Or does it... cue spooky music.");
    if (fromFloor > this._topFloor) throw new Error("You attempted to ascend past the top floor. I know your mother thinks you're an angel, but try again Icarus.");
    const survivedDrop = this._survived(fromFloor - 1)
    if (!survivedDrop) {
      egg.break();
    }
    return survivedDrop;
  }

  /**
   * Returns the number of times {this.survivedDrop(floor)} is called
   * @returns {number} of drop attempts
   */
  getAttemptCount() {
    return this._dropAttempts;
  }

  /**
   * Responds with the floor that the egg will break.
   *
   * @returns {string} the first floor at which the egg will break.
   */
  cheat() {
    return this._firstBreak;
  }

  /**
   * Returns an ascii cheat sheet of what the building looks like with egg drop results
   * and where the egg will break.
   *
   * @returns {string} an ascii cheat sheet of where the egg will break.
   */
  cheatSheet() {
    const DISPLAY_BROKEN = true;
    let cheatSheet = '\n';
    cheatSheet += 'CHEAT SHEET:\n';
    cheatSheet += this.toString(DISPLAY_BROKEN);
    cheatSheet += `   Egg will break at floor ${this.cheat()}!\n`;
    return cheatSheet;
  }

  /**
   * Returns an ascii representation of what the building looks like with egg drop results.
   *
   * @returns {string} an ascii representation of the building
   */
  toString(displayBroken = false) {
    const splatAscii = displayBroken ? ' ೃ*.˚broken˚.*ೃ ' : '                ';
    const roofAscii     = '  .-----------------------------.\n';
    const midFloorAscii = '  |-----------------------------|\n';
    let floorOneAscii    = '  |                             |\n';
        floorOneAscii   += '  |    []  []   .-.   []  []    |\n';
        floorOneAscii   += '  |    []  []   |||   []  []    |\n';
    const streetAscii   = "--'-------------'''-------------'--\n";
    const stepsAscii    = '===================================\n';
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