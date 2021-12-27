const EggCache = require("./EggCache");
const Building = require("./Building");

/**
 * Credit for this test goes to David Cross and Scott Hawker (https://twitter.com/yarell)
 * at CommerceHub.
 *
 * We're going to do an experiment using a 100-story building and 2 eggs.
 *
 * Using as few drops as possible, you'll need to drop the eggs from
 * different floors in order to determine the highest floor from which an egg
 * can be dropped without breaking.
 *
 * The following constraints should be observed:
 *   - You cannot drop an egg from more than 1 floor at a time.
 *   - You may reuse any eggs that remain unbroken after dropping them.
 *   - The eggs are the same - if one breaks from the 30th floor, the other will as well.
 *   - If an egg breaks from a given floor, it will break from all floors above it.
 *   - If an egg does not break from a given floor, it will not break from all floors below it.
 *
 * <strong>Describe the process by which you would make this determination.</strong>
 *
 * Keep in mind the goal of this question isn't for you to come up with the answer we’re looking for on your own.
 *
 * We hope to gain insight to how you approach & solve a tough problem if we brought you on the team.
 *
 * Please feel free to work through ideas & process <strong>with us as your teammates</strong>.
 *
 * @param eggs cache with two unbroken eggs
 * @param building with 100 floors
 * @returns {number} the lowest floor number where an egg dropped, would break
 */
const getLowestBreakingFloor = (eggs, building) => {

  // found a great idea for this solution at khanacademy.org under the topic "Patterns in hundreds Chart"
  // for what it's worth, this is in the 3rd grade math problem solving, lol
  // see https://www.khanacademy.org/math/cc-third-grade-math/arithmetic-patterns-and-problem-solving/imp-patterns-in-arithmetic/v/patterns-in-hundreds-chart
  const floors = building.getFloorCount();
  let egg = eggs.get();
  for (let start = 1, nextStart = start + 9; start < floors; start += 9, nextStart += 9) {
    for (let fromFloor = start; fromFloor < nextStart; fromFloor++) {
      console.log(`dropped from floor #${fromFloor}`);
      egg = egg.isBroken() ? eggs.get() : egg;
      if(!building.survivedDrop(egg, fromFloor)) {
        console.log('##### BROKE #####');
        return fromFloor;
      } else {
        console.log('\t and survived');
      }
    }
  }

  return -1;
};

const successBot = (attempts) => {
  if (attempts > 49) {
    return `, but you dropped ${attempts} times or more, how might you improve this algorithm? `;
  } else if (attempts > 29) {
    return ` and you're warming up. Only ${attempts} attempts that time. Is there a way to cut that attempt count in half?`;
  } else if (attempts > 20) {
    return ` and you're getting closer. Only ${attempts} attempts that time. Does anyone on the team have ideas to help?`;
  } else if (attempts > 14) {
    return ` and you are getting pretty efficient. Only ${attempts} attempts. Is there anything else you can do?`;
  }
  return `. Good work. the Team really nailed it! And only ${attempts} attempts.`;
}

(function() {
  const building = Building.with(100);
  const eggs = EggCache.of(2);

  const correctAnswer = building.cheat();
  const answer = getLowestBreakingFloor(eggs, building);

  console.log(building.cheatSheet());

  if (correctAnswer === answer) {
    console.log(`Test passes${successBot(building.getAttemptCount())}`);
    console.log(`The egg breaks first on floor number ${answer}.`);
  } else {
    console.log('Test Failed!');
    console.log('expected:', correctAnswer);
    console.log('actual:', answer);
  }
})();
