import { Person, TableRows } from "./commonTypes";
import { DEFAULT_TABLE_INDEX } from "./Table";
import { makeAutoObservable } from "mobx"

export class TablesStore {

    public tables: Record<string, TableRows> = {};
    public tableIds: string[] = [DEFAULT_TABLE_INDEX];

    constructor() {
        makeAutoObservable(this);
    }

    public copyTable(tableIndex: string) {
        const data = this.tables[tableIndex];
        this.tables = { ...this.tables, [this.genTableId(tableIndex)]: data };
    }

    public getUniqueString() {
        return Date.now().toString();
    }

    public genTableId(prevTableId: string) {
        const newId = this.getUniqueString();
        const prevIndex = this.tableIds.indexOf(prevTableId);
        this.tableIds.splice(prevIndex + 1, 0, newId);
        return newId;
    }

    public getTableIds() {
        return this.tableIds.filter(id => this.tables[id] !== undefined);
    }

    public removeTable(tableIndex: string) {
        const tables = { ...this.tables };
        delete tables[tableIndex];
        this.tables = tables;
    }

    public markAsRemovedRow(tableIndex: string, rowId: string) {
        const tables = this.tables;
        const infoToUpdate = { ...tables[tableIndex][rowId] };
        infoToUpdate.isRemoved = true;
        this.tables = {
            ...tables, [tableIndex]: { ...tables[tableIndex], [rowId]: infoToUpdate }
        };
    }

    public removeRow(tableIndex: string, rowId: string) {
        const tables = this.tables;
        const tableToUpdate = { ...tables[tableIndex] };
        delete tableToUpdate[rowId];
        this.tables = { ...tables, [tableIndex]: { ...tableToUpdate } };
    }

    public cancelRemovingRow(tableIndex: string, rowId: string) {
        const tables = this.tables;
        const infoToUpdate = { ...tables[tableIndex][rowId] };
        infoToUpdate.isRemoved = false;
        this.tables = {
            ...tables, [tableIndex]: { ...tables[tableIndex], [rowId]: infoToUpdate }
        };
    }

    public updatePersonInfo(data: Person, tableIndex: string, rowId: string) {
        const tables = this.tables;
        if (tableIndex && rowId) {
            this.tables = {
                ...tables, [tableIndex]: { ...tables[tableIndex], [rowId]: data }
            };
        }
    }

    public addPerson(data: Person) {
        const tableIndex = "0";
        const tables = this.tables;
        this.tables = {
            ...tables,
            [tableIndex]: { ...tables[tableIndex], [this.getUniqueString()]: data }
        };
    }

    public updateTablesData(data: Record<string, TableRows>) {
        this.tables = data;
    }

}

