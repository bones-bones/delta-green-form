export enum StatTypes {
    strength = 'strength',
    constitution = 'constitution',
    dexterity = 'dexterity',
    intelligence = 'intelligence',
    will = 'will',
    charisma = 'charisma',
}

export const StatDescriptions: { [key in StatTypes]: StatDescription } = {
    strength: { name: 'Strength', abbreviation: 'STR', description: '' },
    constitution: {
        name: 'Constitution',
        abbreviation: 'CON',
        description: '',
    },
    dexterity: { name: 'Dexterity', abbreviation: 'DEX', description: '' },
    intelligence: {
        name: 'Intelligence',
        abbreviation: 'INT',
        description: '',
    },
    will: { name: 'Willpower', abbreviation: 'WILL', description: '' },
    charisma: { name: 'Charisma', abbreviation: 'CHA', description: '' },
};

type StatDescription = {
    name: string;
    abbreviation: string;
    description: string;
};

export type CharacterStats = { [key in StatTypes]: number };
