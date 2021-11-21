import { DEFAULT_TABLE_INDEX } from "./Table";
import { TableRows } from "./commonTypes";

export const mockedData: Record<string, TableRows> = {
    [DEFAULT_TABLE_INDEX]: {
        "0": {
            name: "Michael",
            surname: "Galeota",
            age: 30,
            city: "Riga"
        },
        "2": {
            name: "Jacques",
            surname: "Galipeau",
            age: 50,
            city: "Riga"
        },
    },
    "1637496942500": {
        "0": {
            name: "Michael",
            surname: "Galeota",
            age: 30,
            city: "Riga"
        },
        "2": {
            name: "Jacques",
            surname: "Galipeau",
            age: 50,
            city: "Riga"
        },
    },
    "1637496971989": {
        "0": {
            name: "Michael",
            surname: "Galeota",
            age: 30,
            city: "Riga"
        },
    },
    "1637496924975": {
        "1": {
            name: "Michael",
            surname: "Galeota",
            age: 30,
            city: "Riga"
        },
        "2": {
            name: "Don",
            surname: "Gallagher",
            age: 54,
            city: "Riga"
        },
    },
};