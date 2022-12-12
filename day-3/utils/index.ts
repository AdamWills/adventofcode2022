import { intersection } from 'https://deno.land/x/lodash@4.17.15-es/lodash.js';

const splitStringInTwoEqualParts = ( input: string ): [string, string] => {
    const half = Math.floor( input.length / 2 );
    return [ input.slice(0, half), input.slice(half) ];
}

const getPriorityValue = ( letter: string ): number => {
    return letter.match(/[a-z]/)
        ?  letter.charCodeAt(0) - 96
        : letter.charCodeAt(0) - 38;
};

// only supports 2 or 3 strings.
const findCommonCharacters = ( group: string[] ): string => {
    const letters = group.map(x => x.split(''));
    return intersection( ...letters ).join('');
}

const calculatePriority = ( input: string ): number => {
    const rucksacks = input.split(/\r?\n/);
    return rucksacks.reduce( ( acc, rucksack ) => {
        // split string in 2 equal length parts
        const duplicateItems = findCommonCharacters( splitStringInTwoEqualParts( rucksack ) );
        if ( duplicateItems.length === 0 ) {
            throw new Error("No duplicate items found");
        }
        return acc + getPriorityValue( duplicateItems[0] );
    }, 0 );
}

const calculateBadgePriority = ( input: string ): number => {
    const groups = [];
    const rucksacks = input.split(/\r?\n/);
    // split rucksacks into groups of 3
    for ( let i = 0; i < rucksacks.length; i += 3 ) {
        groups.push( rucksacks.slice(i, i + 3) );
    }
    return groups.reduce( ( acc, group ) => {
        const duplicateItems = findCommonCharacters( group );
        if ( duplicateItems.length === 0 ) {
            throw new Error("No duplicate items found");
        }
        // console.table([group, duplicateItems, getPriorityValue( duplicateItems ), acc + getPriorityValue( duplicateItems )]);
        return acc + getPriorityValue( duplicateItems );
    }, 0 );
}

export {
    splitStringInTwoEqualParts,
    getPriorityValue,
    findCommonCharacters,
    calculatePriority,
    calculateBadgePriority
}