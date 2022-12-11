import { assertEquals } from 'https://deno.land/std@0.157.0/testing/asserts.ts';

type OPPONENT_MOVES =
      'A' // 'ROCK'
    | 'B' //: 'PAPER',
    | 'C' //: 'SCISSORS'
;

type MY_MOVES =
      'X' //: 'ROCK',
    | 'Y' // 'PAPER',
    | 'Z' // SCISSORS
;

type iScores = { [ K in MY_MOVES]: number };

const SCORES: iScores = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

const getSymbol = ( move: MY_MOVES|OPPONENT_MOVES ): string => {
    if ( move === 'X' || move === 'A' ) {
        return 'ROCK';
    }
    else if ( move === 'Y' || move === 'B' ) {
        return 'PAPER';
    }
    else {
        return 'SCISSORS';
    }
}

const OUTCOMES = {
    'WIN': 6,
    'DRAW': 3,
    'LOSS': 0
};

const decideOutcome = (  opponentMove: OPPONENT_MOVES, myMove: MY_MOVES ): keyof typeof OUTCOMES => {
    if ( getSymbol(myMove) === getSymbol(opponentMove) ) {
        return 'DRAW';
    }
    else if ( myMove === 'X' && opponentMove === 'C' ) {
        return 'WIN';
    }
    else if ( myMove === 'Y' && opponentMove === 'A' ) {
        return 'WIN';
    }
    else if ( myMove === 'Z' && opponentMove === 'B' ) {
        return 'WIN';
    }
    else {
        return 'LOSS';
    }
};

const getMoves = ( round: string ): [OPPONENT_MOVES, MY_MOVES] => round.split(' ') as [OPPONENT_MOVES, MY_MOVES];

const calculateScore = ( input: string ): number => {
    const rounds = input.split(/\r?\n/);
    return rounds.reduce( (acc, round) => {
        const [ opponentMove, myMove ] = getMoves( round );
        const outcome = decideOutcome( opponentMove, myMove );
        // console.log( `Round: ${round} - Outcome: ${outcome}`);
        return acc + OUTCOMES[ outcome ] + SCORES[ myMove ];
    }, 0);
};

Deno.test('part A', async () => {
    const input = await Deno.readTextFile("./test.txt");
    const score = calculateScore( input );
    assertEquals(score, 15);
} );

const input = await calculateScore( await Deno.readTextFile("./input.txt") );
console.log( `My total score for part A is ${input}` );
/* ---------------------------- */

const needToLose = ( result: MY_MOVES ): boolean => result === 'X';
const needToDraw = ( result: MY_MOVES ): boolean => result === 'Y';

const calculatePartBScore = ( input: string ): number => {
    const rounds = input.split(/\r?\n/);

    const getRequiredMove = ( opponentMove: OPPONENT_MOVES, requiredResult: MY_MOVES ): MY_MOVES => {
        // X = need to lose
        if ( needToLose( requiredResult) ) {
            switch (opponentMove) {
                case 'A':
                    return 'Z';
                case 'B':
                    return 'X';
                default:
                    return 'Y';
            }
        }
        if ( needToDraw( requiredResult ) ) {
            switch (opponentMove) {
                case 'A':
                    return 'X';
                case 'B':
                    return 'Y';
                default:
                    return 'Z';
            }
        }
        // need to win
        switch (opponentMove) {
            case 'A':
                return 'Y';
            case 'B':
                return 'Z';
            default:
                return 'X';
        }
    }

    return rounds.reduce( (acc, round) => {
        const [ opponentMove, requiredResult ] = getMoves( round );
        const myMove = getRequiredMove( opponentMove, requiredResult );
        let outcome: keyof typeof OUTCOMES = 'WIN';
        switch (requiredResult) {
            case 'X':
                outcome = 'LOSS';
                break;
            case 'Y':
                outcome = 'DRAW';
                break;
            default:
                outcome = 'WIN';
                break;
        }
        return acc + OUTCOMES[ outcome ] + SCORES[ myMove ];
    }, 0 );
}

Deno.test('part B', async () => {
    const input = await Deno.readTextFile("./test.txt");
    const score = calculatePartBScore( input );
    assertEquals(score, 12);
});

const partBAnswer = await calculatePartBScore( await Deno.readTextFile("./input.txt") );
console.log( `My total score for part B is ${partBAnswer}` );