import React from "react";

import { Person, TableRows } from "./commonTypes";
import { FillingForm, PopupForm } from "./Form";
import { mockedData, mockedTablesPositions } from "./mockedData";
import { Table, DEFAULT_TABLE_INDEX } from "./Table";

import styles from "./App.module.css";

type AppState = {
    tables: Record<string, TableRows>;
    selectedPerson: Person | undefined;
    selectedTable: string | undefined;
    selectedRow: string | undefined;
    removingTable: string | undefined;
    removedTable: string | undefined;
};

export class App extends React.Component<{}, AppState> {

    state: AppState = {
        tables: {
            [DEFAULT_TABLE_INDEX]: {},
        },
        selectedPerson: undefined,
        selectedRow: undefined,
        selectedTable: undefined,
        removedTable: undefined,
        removingTable: undefined,
    }

    private removeTimeoutIds: Record<string, number> = {};
    private popupRef = React.createRef<HTMLDivElement>();
    public tableIds: string[] = [DEFAULT_TABLE_INDEX];

    public copyTable = (tableIndex: string) => {
        const data = this.state.tables[tableIndex];
        this.updateTablesData({ ...this.state.tables, [this.genTableId(tableIndex)]: data });
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
        return this.tableIds.filter(id => this.state.tables[id] !== undefined);
    }

    public removeTable = (tableIndex: string) => {
        this.setState({ removingTable: tableIndex });
        setTimeout(() => {
            // TODO: rework as "confirm" might not work in iframe
            if (window.confirm("You pressed 'remove' for table. Are you sure?")) {
                this.setState({ removedTable: tableIndex });
                setTimeout(() => {
                    const tables = { ...this.state.tables };
                    delete tables[tableIndex];
                    this.updateTablesData(tables);
                    this.setState({ removingTable: undefined, removedTable: undefined });
                }, 1000);
            } else {
                this.setState({ removingTable: undefined });
            }
        }, 100);
    }

    public editRow = (tableIndex: string, rowId: string) => {
        this.setState({
            selectedPerson: this.state.tables[tableIndex][rowId],
            selectedRow: rowId,
            selectedTable: tableIndex,
        });
    }

    public removeRow = (tableIndex: string, rowId: string) => {
        const tables = this.state.tables;
        const infoToUpdate = { ...tables[tableIndex][rowId] };
        infoToUpdate.isRemoved = true;
        this.updateTablesData({
            ...tables, [tableIndex]: { ...tables[tableIndex], [rowId]: infoToUpdate }
        });

        this.removeTimeoutIds[tableIndex + "_" + rowId] = window.setTimeout(() => {
            const tables = this.state.tables;
            const tableToUpdate = { ...tables[tableIndex] };
            delete tableToUpdate[rowId];
            this.updateTablesData({ ...tables, [tableIndex]: { ...tableToUpdate } });
        }, 5000);
    }

    public cancelRemovingRow = (tableIndex: string, rowId: string) => {
        window.clearInterval(this.removeTimeoutIds[tableIndex + "_" + rowId]);
        delete this.removeTimeoutIds[tableIndex + "_" + rowId];

        const tables = this.state.tables;
        const infoToUpdate = { ...tables[tableIndex][rowId] };
        infoToUpdate.isRemoved = false;
        this.updateTablesData({
            ...tables, [tableIndex]: { ...tables[tableIndex], [rowId]: infoToUpdate }
        });
    }

    public updatePersonInfo = (data: Person) => {
        const tables = this.state.tables;
        const tableIndex = this.state.selectedTable;
        const rowId = this.state.selectedRow
        if (tableIndex && rowId) {
            this.updateTablesData({
                ...tables, [tableIndex]: { ...tables[tableIndex], [rowId]: data }
            });
            this.clearCurrent();
        }
    }

    public addPerson = (data: Person) => {
        const tableIndex = "0";
        const tables = this.state.tables;
        this.updateTablesData({
            ...tables,
            [tableIndex]: { ...tables[tableIndex], [this.getUniqueString()]: data }
        });
    }

    public updateTablesData(data: Record<string, TableRows>) {
        this.setState({ tables: data });
        localStorage.setItem("tablesData", JSON.stringify(data));
        localStorage.setItem("tablesPositions", JSON.stringify(this.tableIds));
    }

    public handleClickOutsideOfPopup = (event: MouseEvent) => {
        if (this.popupRef.current && !this.popupRef.current.contains(event.target as Element)) {
            this.clearCurrent();
        }
    };

    public handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            this.clearCurrent();
        }
    };

    public clearCurrent() {
        this.setState({
            selectedPerson: undefined,
            selectedRow: undefined,
            selectedTable: undefined
        });
    }

    public componentDidMount() {
        document.addEventListener("click", this.handleClickOutsideOfPopup, true);
        document.addEventListener("keyup", this.handleEscape, true);

        const positionsData = localStorage.getItem("tablesPositions");
        try {
            if (positionsData !== null) {
                this.tableIds = JSON.parse(positionsData) as string[]
            } else {
                this.tableIds = [...mockedTablesPositions];
            }
        } catch (e) {
            console.error(e, positionsData);
        }
        const data = localStorage.getItem("tablesData");
        try {
            if (data !== null) {
                this.setState({ tables: JSON.parse(data) as Record<string, TableRows> });
            } else {
                this.setState({ tables: mockedData });
            }
        } catch (e) {
            console.error(e, data);
        }
    }

    public componentWillUnmount() {
        document.removeEventListener("keyup", this.handleEscape, true);
        document.removeEventListener("click", this.handleClickOutsideOfPopup, true);
    }

    public render() {
        return (
            <div className={styles.App}>
                <div className={styles.InputWidget}>
                    <FillingForm onSave={this.addPerson}/>
                </div>
                {this.getTableIds().map(tableIndex => (
                    <div
                        className={
                            styles.TableWidget +
                            (tableIndex === this.state.removedTable ? " " + styles.RemovedTable : "") +
                            (tableIndex === this.state.removingTable ? " " + styles.RemovingTable: "")
                        }
                        key={tableIndex}
                    >
                        <Table
                            activeRecord={tableIndex === this.state.selectedTable ? this.state.selectedRow : undefined}
                            tableIndex={tableIndex}
                            data={this.state.tables[tableIndex]}
                            copyTable={this.copyTable}
                            removeTable={this.removeTable}
                            editRow={this.editRow}
                            removeRow={this.removeRow}
                            cancelRemovingRow={this.cancelRemovingRow}
                        />
                    </div>))}
                <div ref={this.popupRef}>
                    <PopupForm onSave={this.updatePersonInfo} data={this.state.selectedPerson}/>
                </div>
            </div>
        );
    }
}
