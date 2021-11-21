import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './App';
import { DEFAULT_TABLE_INDEX } from "./Table";

describe("App", () => {

    it('should render "Copy table" button', () => {
        render(<App/>);
        const linkElement = screen.getAllByText(/Copy table/i);
        expect(linkElement[0]).toBeInTheDocument();
    });

    describe("test internal implementation", () => {

        let app: App;
        beforeEach(() => {
            app = new App({ });
            app.setState = (data: any) => { app.state = { ...app.state, ...data }; };
            app.componentDidMount();
        });

        afterEach(() => {
            localStorage.removeItem("tablesData");
            localStorage.removeItem("tablesPositions");
        });

        it("should load default data", () => {
            expect(Object.keys(app.state.tables).length).toBe(4);
        });

        it("should copy new table", () => {
            app.copyTable(DEFAULT_TABLE_INDEX);

            expect(Object.keys(app.state.tables).length).toBe(5);
        });

        it("should add new tableId after current", () => {
            app.store.getUniqueString = () => "111";
            app.store.genTableId("0");
            expect(app.store.tableIds).toEqual(["0", "111",
                "1637496942500", "1637496971989", "1637496924975",
            ]);
        });

        it("should remove table", () => {
            jest.useFakeTimers();
            window.confirm = () => true;

            app.removeTable("1637496942500");
            jest.advanceTimersByTime(100);
            jest.advanceTimersByTime(1000);

            expect(Object.keys(app.state.tables).length).toBe(3);
        });

        it("should mark item as removed", () => {
            app.removeRow("1637496942500", "0");

            expect(app.state.tables["1637496942500"]["0"].isRemoved).toBe(true);
        });

        it("should remove item after 5s", () => {
            jest.useFakeTimers();

            app.removeRow("1637496942500", "0");
            jest.advanceTimersByTime(5000);
            expect(app.state.tables["1637496942500"]["0"]).toBe(undefined);
        });

        it("should add new item", () => {
            app.store.getUniqueString = () => "333";
            app.addPerson({
                name: "Ivan",
                surname: "Petrov",
                age: 20,
                city: "London",
            });
            expect(app.state.tables["0"]["333"].name).toBe("Ivan");
        });

    });

});

