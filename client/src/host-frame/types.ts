export type PlayerDefinition = {
    personData: {
        name: string;
        profession: string;
        background: string;
    };

    derivedStats: {
        hp: { current: number; max: number };
        wp: { current: number; max: number };
        sp: { current: number; max: number };
        bp: number;
    };
};
