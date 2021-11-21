
export type Person = {
    name: string;
    surname: string;
    age: number;
    city: string;
    isRemoved?: boolean;
};

export type TableRows = Record<string, Person>;
