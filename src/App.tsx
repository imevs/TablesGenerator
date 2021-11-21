import React from "react";
import { reaction } from "mobx"

import { Person, TableRows } from "./commonTypes";
import { FillingForm, PopupForm } from "./Form";
import { mockedData, mockedTablesPositions } from "./mockedData";
import { Table } from "./Table";
import { TablesStore } from "./TablesStore";

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
        tables: {},
        selectedPerson: undefined,
        selectedRow: undefined,
        selectedTable: undefined,
        removedTable: undefined,
        removingTable: undefined,
    }

    private removeTimeoutIds: Record<string, number> = {};
    private popupRef = React.createRef<HTMLDivElement>();
    public store = new TablesStore();

    public copyTable = (tableIndex: string) => {
        this.store.copyTable(tableIndex);
    }

    public removeTable = (tableIndex: string) => {
        this.setState({ removingTable: tableIndex });
        setTimeout(() => {
            // TODO: rework as "confirm" might not work in iframe
            if (window.confirm("You pressed 'remove' for table. Are you sure?")) {
                this.setState({ removedTable: tableIndex });
                setTimeout(() => {
                    this.store.removeTable(tableIndex);
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
        this.store.markAsRemovedRow(tableIndex, rowId);

        this.removeTimeoutIds[tableIndex + "_" + rowId] = window.setTimeout(() => {
            this.store.removeRow(tableIndex, rowId);
        }, 5000);
    }

    public cancelRemovingRow = (tableIndex: string, rowId: string) => {
        window.clearInterval(this.removeTimeoutIds[tableIndex + "_" + rowId]);
        delete this.removeTimeoutIds[tableIndex + "_" + rowId];

        this.store.cancelRemovingRow(tableIndex, rowId);
    }

    public updatePersonInfo = (data: Person) => {
        if (this.state.selectedTable && this.state.selectedRow) {
            this.store.updatePersonInfo(data, this.state.selectedTable, this.state.selectedRow);
            this.clearCurrent();
        }
    }

    public addPerson = (data: Person) => {
        this.store.addPerson(data);
    }

    public updateTablesData(data: Record<string, TableRows>, tableIds: string[]) {
        this.setState({ tables: data });
        localStorage.setItem("tablesData", JSON.stringify(data));
        localStorage.setItem("tablesPositions", JSON.stringify(tableIds));
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

        reaction(
            () => (this.store.tables),
            (tables) => {
                this.updateTablesData(tables, this.store.tableIds);
            });

        const positionsData = localStorage.getItem("tablesPositions");
        try {
            if (positionsData !== null) {
                this.store.tableIds = JSON.parse(positionsData) as string[]
            } else {
                this.store.tableIds = [...mockedTablesPositions];
            }
        } catch (e) {
            console.error(e, positionsData);
        }
        const data = localStorage.getItem("tablesData");
        try {
            if (data !== null) {
                this.store.updateTablesData(JSON.parse(data) as Record<string, TableRows>);
            } else {
                this.store.updateTablesData(mockedData);
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
                {this.store.getTableIds().map(tableIndex => (
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
