import { StatTypes } from './types';

export const getDistinguishingFeatures = (stat: StatTypes, value: number) => {
    const statSet = bigTable[stat];

    const breakPoints: (3 | 5 | 9 | 13 | 17)[] = [3, 5, 9, 13, 17];
    let currentIteration = 0;
    while (
        breakPoints[currentIteration + 1] &&
        breakPoints[currentIteration + 1] < value
    ) {
        currentIteration++;
    }
    return statSet[breakPoints[currentIteration]][
        Math.floor(
            Math.random() * statSet[breakPoints[currentIteration]].length
        )
    ];
};

const bigTable: {
    [key in StatTypes]: {
        3: string[];
        5: string[];
        9: string[];
        13: string[];
        17: string[];
    };
} = {
    strength: {
        3: ['Feeble', 'Frail', 'Doddering'],
        5: ['Weak', 'Weedy', 'Indisposed'],
        9: ['Average'],
        13: ['Muscular', 'Brawny', 'Burly'],
        17: ['Huge', 'Jacked', 'Herculean'],
    },
    dexterity: {
        3: ['Barely mobile', 'Shuffling', 'Inept'],
        5: ['Clumsy', 'Blundering', 'Graceless'],
        9: ['Average'],
        13: ['Nimble', 'Agile', 'Lithe'],
        17: ['Acrobatic', 'Fleet', 'Adroit'],
    },
    constitution: {
        3: ['Bedridden', 'Housebound', 'Incapacitated'],
        5: ['Sickly', 'Unhealthy', 'Puny'],
        9: ['Average'],
        13: ['Perfect health', 'Tenacious', 'Energetic'],
        17: ['Indefatigable', 'Tireless', 'Relentless'],
    },
    intelligence: {
        3: ['Imbecilic', 'Doltish', 'Feebleminded'],
        5: ['Slow', 'Asinine', 'Simple'],
        9: ['Average'],
        13: ['Perceptive', 'Discerning', 'Clever'],
        17: ['Brilliant', 'Virtuoso', 'Genius'],
    },
    will: {
        3: ['Spineless', 'Gutless', 'Craven'],
        5: ['Nervous', 'Pathetic', 'Chickenshit'],
        9: ['Average'],
        13: ['Strong-willed', 'Fortified', 'Unshakeable'],
        17: ['Indomitable', 'Unassailable', 'Lionhearted'],
    },
    charisma: {
        3: ['Unbearable', 'Guileless', 'Abrassive'],
        5: ['Awkward', 'Pesky', 'Obstinante'],
        9: ['Average'],
        13: ['Charming', 'Endearing', 'Fetching'],
        17: ['Magnetic', 'Bodacious', 'Bewitching'],
    },
};
