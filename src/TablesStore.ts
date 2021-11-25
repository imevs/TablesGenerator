import { Person, TableRows } from "./commonTypes";
import { DEFAULT_TABLE_INDEX } from "./Table";
import { makeAutoObservable } from "mobx"

export class TablesStore {

    private tableData = new Map<string, Map<string, Person>>();
    public tableIds: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public copyTable(tableIndex: string) {
        const data = this.tableData.get(tableIndex);
        if (data) {
            this.tableData.set(this.genTableId(tableIndex), data);
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
        return this.tableIds.filter(id => this.tableData.get(id) !== undefined);
    }

    public removeTable(tableIndex: string) {
        this.tableData.delete(tableIndex);
    }

    public markAsRemovedRow(tableIndex: string, rowId: string) {
        this.tableData.get(tableIndex)!.get(rowId)!.isRemoved = true;
    }

    public removeRow(tableIndex: string, rowId: string) {
        this.tableData.get(tableIndex)!.delete(rowId);
    }

    public cancelRemovingRow(tableIndex: string, rowId: string) {
        this.tableData.get(tableIndex)!.get(rowId)!.isRemoved = false;
    }

    public updatePersonInfo(data: Person, tableIndex: string, rowId: string) {
        if (tableIndex && rowId) {
            this.tableData.get(tableIndex)!.set(rowId, data);
        }
    }

    public addPerson(data: Person) {
        this.tableData.get(DEFAULT_TABLE_INDEX)!.set(this.getUniqueString(), data);
    }

    public updateTablesData(data: Record<string, TableRows>) {
        const d: Record<string, Map<string, Person>> = {};
        for (const k in data) {
            d[k] = new Map(Object.entries(data[k]));
        }
        this.tableData = new Map(Object.entries(d));
    }

    public get tables(): Record<string, TableRows> {
        const result = Object.fromEntries(this.tableData);
        const returnData: Record<string, TableRows> = {};
        for (const item in result) {
            returnData[item] = Object.fromEntries(result[item]);
        }
        return returnData;
    }

}

