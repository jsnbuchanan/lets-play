/*
Word Wrap Problem
=================
Given a string of words, each separated by a space, and a limit on the number of characters that can be put on one line (line width), return an array of lines with the original words in order such that no line is longer than the given line width and each line fits as many words as possible. No words can be split.

Given:
A string of words, separated by space
A limit on number of characters per line (line width)

Returns:
- Array of lines with original words and spacing
- No line longer than given line width
- No word can be split
- No lines should start or end with a space
- As many words per line as possible
- The maximum character width should never be less than the longest word.



Example
--

 inputs:
`word`: "Git is best thought of as a tool for storing the history of a collection of files. It stores the history as a compressed collection of interrelated snapshots of the project’s contents. In Git each such version is called a commit."
`maxCharactersPerLine`: 20

 outputs:
`
[
"Git is best thought",
"of as a tool for",
"storing the history",
"of a collection of",
"files. It stores the",
"history as a",
"compressed",
"collection of",
"interrelated",
"snapshots of the",
"project’s contents.",
"In Git each such",
"version is called a",
"commit."
]
`
*/

const _ = require('lodash');

const main = () => {
  const testString = 'Git is best thought of as a tool for storing the history of a collection of files. It stores the history as a compressed collection of interrelated snapshots of the project’s contents. In Git each such version is called a commit.';
  const testMaxCharactersPerLine = 20;

  const results = wrapWords(testString, testMaxCharactersPerLine);
  const expected = [
    'Git is best thought',
    'of as a tool for',
    'storing the history',
    'of a collection of',
    'files. It stores the',
    'history as a',
    'compressed',
    'collection of',
    'interrelated',
    'snapshots of the',
    'project’s contents.',
    'In Git each such',
    'version is called a',
    'commit.',
  ];

  if (_.isEqual(results, expected)) {
    console.log('Test Passes!');
    console.log('results:', results);
  } else {
    console.log('results:', results);
    console.log('expected:', expected);
  }
};

const wrapWords = (words, charactersPerLine) => {
  let stringArray = [];
  let lineStart = 0;
  const noMoreWords = words.length
  do {
    const br = lineStart + charactersPerLine;

    // if breaking point is passed the end of words, add the last line
    if (br >= noMoreWords) {
      stringArray.push(words.substring(lineStart));
      break;
    }

    // if the breaking point is not a space, search backwards to the closest space
    let lineEnd = words[br] === ' ' ? br : words.lastIndexOf(' ', br);

    // word is longer then the max characters per line or comes at the end for words, take the whole word
    // this edge case occurs when the charactersPerLine is less than the longest word
    if (lineEnd < lineStart) {
      const nextSpaceIndex = words.indexOf(' ', lineStart);
      lineEnd = nextSpaceIndex > -1 ? nextSpaceIndex : noMoreWords;
    }

    stringArray.push(words.substring(lineStart, lineEnd));
    lineStart = lineEnd + 1;

  } while (lineStart < noMoreWords)

  return stringArray;
};

main();