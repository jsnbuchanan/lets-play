const EggCache = require("./EggCache");
const Building = require("./Building");
const Log = require("./Log");

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

  // khanacademy.org inspired this solution under the topic "Patterns in hundreds Chart"
  // for what it's worth, this is in the 3rd grade math problem solving, lol
  // see https://www.khanacademy.org/math/cc-third-grade-math/arithmetic-patterns-and-problem-solving/imp-patterns-in-arithmetic/v/patterns-in-hundreds-chart

  const floors = building.getFloorCount();
  const firstEgg = eggs.get();
  const secondEgg = eggs.get();
  for (let start = 1, step = 13; start <= floors; start += 1 + (step > 2 ? step-- : 2) ) {
    const nextStep = start + step;
    let topFloorThisRound = nextStep < floors ? nextStep : floors;
    building.drop(firstEgg, topFloorThisRound);
    if(firstEgg.isBroken()) {
      for (let fromFloor = start; fromFloor < topFloorThisRound; fromFloor++) {
        building.drop(secondEgg, fromFloor);
        if(secondEgg.isBroken()) {
          return fromFloor;
        }
      }
      return topFloorThisRound;
    }
  }

  return -1;
};

const successBot = (log) => {
  const { fastest, average, slowest } = log;

  const fastestAndAvg = `Fastest was ${fastest} attempts, with an average attempt count of ${average}.`;

  if (slowest > 49) {
    return `, but your max drop count to determine which floor was ${slowest} times or more, how might you improve this algorithm? ${fastestAndAvg}`;
  } else if (slowest > 29) {
    return ` and you're warming up. Max drop count was only ${slowest} attempts that time. Is there a way to cut that attempt count in half? ${fastestAndAvg}`;
  } else if (slowest > 20) {
    return ` and you're getting closer. Max drop count was only ${slowest} attempts that time. Does anyone on the team have ideas to help? ${fastestAndAvg}`;
  } else if (slowest > 14) {
    return ` and you are getting pretty efficient. Max drops was only ${slowest} attempts. Is there anything else you can do? ${fastestAndAvg}`;
  }
  return `. Good work. the Team really nailed it! And max drops was only ${slowest} attempts. ${fastestAndAvg}`;
}


(function() {
  const repetitions = 1000;
  const buildingHeightInFloors = 100;
  const log = new Log(buildingHeightInFloors, repetitions);

  for (let rep = 0; rep < repetitions; rep++) {

    const building = Building.with(buildingHeightInFloors);
    const eggs = EggCache.of(2);

    const answer = getLowestBreakingFloor(eggs, building);

    const correctAnswer = building.cheat();
    if (correctAnswer !== answer) {
      console.log(`Test Failed on repetition ${rep}!`);
      console.log('expected floor #', correctAnswer);
      console.log('actual answer ', answer);
      return;
    }
    log.add(building.getAttemptCount());

    // console.log(building.cheatSheet());
  }
  console.log(`Test passes${successBot(log)}`);
})();
