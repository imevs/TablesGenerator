import React from "react";

import { TableRows } from "./commonTypes";

import styles from "./Table.module.css";

type TableProps = {
    tableIndex: string;
    data: TableRows;
    activeRecord: string | undefined;
    copyTable: (tableIndex: string) => void;
    removeTable: (tableIndex: string) => void;
    editRow: (tableIndex: string, rowId: string) => void;
    removeRow: (tableIndex: string, rowId: string) => void;
    cancelRemovingRow: (tableIndex: string, rowId: string) => void;
}

// The table with this index could not be removed
export const DEFAULT_TABLE_INDEX = "0";

export function Table(props: TableProps) {
    const rowsCount = Math.max(Object.keys(props.data).length, 10);
    const rowsRange = (new Array(rowsCount)).fill(0).map((v, i) => String(i));
    return <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
            <button
                className={styles.tableHeader__button_copy}
                onClick={() => props.copyTable(props.tableIndex)}
            >Copy table
            </button>
            {props.tableIndex !== DEFAULT_TABLE_INDEX &&
            <button
                title="Remove table"
                className={styles.tableHeader__button_remove}
                onClick={() => props.removeTable(props.tableIndex)}
            >X</button>}
        </div>
        <table className={styles.tableContent}>
            <thead>
            <tr className={styles.tableContent__header}>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>City</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {rowsRange.map((rowId) => (
                <tr key={rowId}
                    className={
                        (props.activeRecord === rowId ? styles.tableContent__row_selected : "") +
                        (props.data[rowId]?.isRemoved ? styles.tableContent__row_removed : "")
                    }
                >
                    <td>{props.data[rowId]?.name}</td>
                    <td>{props.data[rowId]?.surname}</td>
                    <td>{props.data[rowId]?.age}</td>
                    <td>{props.data[rowId]?.city}</td>
                    <td>
                        {props.data[rowId] && props.data[rowId].isRemoved
                        && <button
                            className={styles.tableContent__link + " " + styles.tableContent__link_blue}
                            onClick={() => props.cancelRemovingRow(props.tableIndex, rowId)}>
                            Restore (item will be removed in 5s)
                        </button>}
                        {props.data[rowId] && !props.data[rowId].isRemoved && <>
                            <button
                                className={styles.tableContent__link + " " + styles.tableContent__link_blue}
                                onClick={() => props.editRow(props.tableIndex, rowId)}
                            >Edit
                            </button>
                            <button
                                className={styles.tableContent__link + " " + styles.tableContent__link_red}
                                onClick={() => props.removeRow(props.tableIndex, rowId)}>
                                Delete
                            </button>
                        </>}
                    </td>
                </tr>))}
            </tbody>
        </table>
    </div>;
}
