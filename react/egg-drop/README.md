# Egg Drop in Two

### Objective
Determine which floor, when an egg is dropped, will be the first floor that breaks the egg. 

### Given 
- a 100-floor building
- two eggs
- each egg is individually packaged and insulated
- the packaging is exactly the same and so are the eggs
- if the egg doesn't break when dropped, it incurs no cumulative damage
- you can drop an egg unlimited times until it break

### What Success Looks Like
Create an algorithm that will discover the lowest drop that will break the egg in the most efficient manner possible.

---
## API
- [Building.with(floorCount) & building.toString()](`Building.with(floorCount)`)
- [building.survivedDrop(floorNumber)](`building.survivedDrop(floorNumber)`)
- [building.cheat()](`building.cheat()`)
- [building.cheatSheet()](`building.cheatSheet()`)
## Example API usage
### `Building.with(floorCount)`
Create a building object with 3 floors:
```javascript
const Building = require("./Building");
const building = Building.with(2);

console.log(building.toString());
```
displays:

<pre>
  .-----------------------------.
  | floor 2                     |  
  |-----------------------------|
  | floor 1                     |  
  |                             |
  |    []  []   .-.   []  []    |
  |    []  []   |||   []  []    |
--'-------------'''-------------'--
===================================
</pre>
---

### `building.survivedDrop(floorNumber)`
Given a floor number to check an egg drop from, this method responds in the following four ways:
```javascript
const Building = require("./Building");

let demonstrationCompleted = false;
do {
  try {
    const floorCount = 5;
    const building = Building.with(floorCount);

    let demo = `\nGiven a ${floorCount} story building:`;

    const firstBreakingFloor = building.cheat();
    if (!building.survivedDrop(firstBreakingFloor)) {
      demo += `\n\t✓ The egg breaks when dropped from floor ${firstBreakingFloor}.`;
    }

    const fromSafeFloor = firstBreakingFloor - 1;
    if (building.survivedDrop(fromSafeFloor)) {
      demo += `\n\t✓ The egg does NOT break when dropped from floor ${fromSafeFloor}.`;
    }

    const fromBasement = -1;
    try { building.survivedDrop(fromBasement); }
    catch (e) { demo += `\n\t✓ Dropping below street level will Error with:\n\t\t"${e.message}"`; }

    const fromAboveBuilding = floorCount + 1;
    try { building.survivedDrop(fromAboveBuilding);
    } catch (e) { demo += `\n\t✓ Dropping above the top floor will Error with:\n\t\t"${e.message}"`; }

    console.log(demo);

    demonstrationCompleted = true;
  } catch (_) {
    // do > try > while escapes exceptional conditions on lines 15 & 20 that can be safely ignored for this demonstration
  }
} while (!demonstrationCompleted);
```
displays:

<pre>
Given a 5 story building:
        ✓ The egg breaks when dropped from floor 3.
        ✓ The egg does NOT break when dropped from floor 2.
        ✓ Dropping below street level will Error with:
                "You attempted to access a floor below street level. This building has no basement. Or does it... cue spooky music."
        ✓ Dropping above the top floor will Error with:
                "You attempted to ascend past the top floor. I know your mother thinks you're an angel, but try again Icarus."
</pre>

---

### `building.cheat()`
Returns the first floor, from which, a dropped egg will break.
```javascript
const Building = require("./Building");

console.log(`Egg breaks on floor number ${Building.with(3).cheat()}`);
```
displays `Egg breaks on floor number 2`

--- 
### `building.cheatSheet()`
Get an ascii cheat sheet for what the building looks like:
```javascript
const Building = require("./Building");

console.log(Building.with(3).cheatSheet());
```
displays:

<pre>
CHEAT SHEET:
  .-----------------------------.
  | floor 3     ೃ*.˚broken˚.*ೃ  |  
  |-----------------------------|
  | floor 2     ೃ*.˚broken˚.*ೃ  |  
  |-----------------------------|
  | floor 1                     |  
  |                             |
  |    []  []   .-.   []  []    |
  |    []  []   |||   []  []    |
--'-------------'''-------------'--
===================================
   Egg will break at floor 2!
</pre>
