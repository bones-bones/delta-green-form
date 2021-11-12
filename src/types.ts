export interface PersonalData {
    name: string;
    profession: string;
    pronouns: string;
    dob: string;
    educationHistory: string[];
    experienceHistory: string[];
}

export interface StatisticalData {
    strength: StatValue;
    constitution: StatValue;
    dexterity: StatValue;
    intelligence: StatValue;
    power: StatValue;
    charisma: StatValue;
}

interface StatValue {
    value: number;
    descriptor: string;
}