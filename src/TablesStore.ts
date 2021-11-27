import { Person, TableRows } from "./commonTypes";
import { DEFAULT_TABLE_INDEX } from "./Table";
import { makeAutoObservable } from "mobx"

export class TablesStore {

    private tableData: Record<string, Record<string, Person>> = {};
    private tableIds: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public copyTable(tableIndex: string) {
        const data = this.tableData[tableIndex];
        if (data) {
            this.tableData[this.genTableId(tableIndex)] = data;
        }
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
        return this.tableIds.filter(id => this.tableData[id] !== undefined);
    }

    public removeTable(tableIndex: string) {
        delete this.tableData[tableIndex];
    }

    public markAsRemovedRow(tableIndex: string, rowId: string) {
        this.tableData[tableIndex][rowId]!.isRemoved = true;
    }

    public removeRow(tableIndex: string, rowId: string) {
        delete this.tableData[tableIndex][rowId];
    }

    public cancelRemovingRow(tableIndex: string, rowId: string) {
        this.tableData[tableIndex][rowId]!.isRemoved = false;
    }

    public updatePersonInfo(data: Person, tableIndex: string, rowId: string) {
        if (tableIndex && rowId) {
            this.tableData[tableIndex][rowId] = data;
        }
    }

    public addPerson(data: Person) {
        this.tableData[DEFAULT_TABLE_INDEX][this.getUniqueString()] = data;
    }

    public updateTablesData(data: Record<string, TableRows>) {
        this.tableData = data;
    }

    public updateTablePositions(data: string[]) {
        this.tableIds = data;
    }

    public get tablePositions() {
        return this.tableIds;
    }

    public get tables(): Record<string, TableRows> {
        const returnData: Record<string, TableRows> = {};
        for (const item in this.tableData) {
            returnData[item] = { ...this.tableData[item] };
        }
        return returnData;
    }

}
