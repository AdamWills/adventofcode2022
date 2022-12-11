// const input = await Deno.readTextFile("./test.txt");
const input = await Deno.readTextFile("./input.txt");
const lines = input.split(/\r?\n/);
const elves: number[] = [];
let currentElfCalories = 0;
lines.forEach((line) => {
  if ( line !== '' ) {
    currentElfCalories += parseInt(line);
  }
  else {
    elves.push( currentElfCalories );
    currentElfCalories = 0;
  }
});

const max = Math.max(...elves);
const maxIndex = elves.indexOf(max);
console.log(`The maximum value is ${max} and is carried by elf #${maxIndex + 1}`);

const sortedElves = elves.sort((a, b) => b - a).slice(0, 3);
console.table( sortedElves );
const total = sortedElves.reduce((a, b) => a + b, 0);
console.log(`The total of the top 3 elves is ${total}`);
