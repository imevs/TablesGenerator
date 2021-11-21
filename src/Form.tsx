import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";

import styles from "./Form.module.css";
import { Person } from "./commonTypes";

const listOfCities = ["Riga", "Cesis", "Daugavpils"];

type FillingFormProps = {
    needConfirmation?: boolean;
    data?: Person;
    onSave: (data: Person) => void;
};

function usePropertyBinding<T extends (number | string | undefined)>(initialValue: T, propName: string): [
    T, (event: ChangeEvent) => void, () => void, string | undefined, () => void, () => void,
] {
    const [fieldState, setFieldState] = useState(initialValue);
    const onFieldChange = useCallback((event) => { setFieldState(event.target.value); }, []);
    const onFieldFocus = useCallback(() => { setPlaceholder(""); }, []);
    const onFieldBlur = useCallback(() => {
        setPlaceholder(propName + " (is required field)"); }, []);
    const [placeholder, setPlaceholder] = useState(propName);
    const resetField = useCallback(() => {
        setPlaceholder(propName);
        setFieldState(initialValue);
    }, []);

    return [fieldState, onFieldChange, resetField, placeholder, onFieldFocus, onFieldBlur];
}

export function FillingForm(props: FillingFormProps) {
    const [nameState, onNameChange, resetNameState, namePlaceholder, onNameFocus, onNameBlur] =
        usePropertyBinding(props.data?.name ?? "", "Name");

    const [surNameState, onSurNameChange, resetSurNameState, surnamePlaceholder, onSurNameFocus, onSurNameBlur] =
        usePropertyBinding(props.data?.surname ?? "", "Surname");

    const [ageState, onAgeChange, resetAgeState, agePlaceholder, onAgeFocus, onAgeBlur] =
        usePropertyBinding(props.data?.age ?? "", "Age");

    const [cityState, onCityChange, resetCityState, cityPlaceholder, onCityFocus, onCityBlur] =
        usePropertyBinding(props.data?.city ?? "", "City");

    const isFormValid = [nameState, surNameState, ageState, cityState].every(f => f !== "");

    const [confirmIsExpected, setConfirmIsExpected] = useState(false);

    const onSave = useCallback((e: FormEvent) => {
        if (props.needConfirmation && !confirmIsExpected) {
            setConfirmIsExpected(true);
        } else {
            setConfirmIsExpected(false);
            props.onSave({
                    name: nameState.trim(),
                    surname: surNameState.trim(),
                    age: typeof ageState === "string"
                        ? (ageState === "" ? 0 : parseFloat(ageState))
                        : ageState,
                    city: cityState.trim(),
                    isRemoved: false,
                },
            );
            resetNameState();
            resetSurNameState();
            resetAgeState();
            resetCityState();
        }
        e.preventDefault();
    }, [nameState, surNameState, ageState, cityState, confirmIsExpected,
        resetAgeState, resetCityState, resetNameState, resetSurNameState, props]);

    return <form className={styles.fillingForm} onSubmit={onSave}>
        <p>
            <input
                className={styles.formElement}
                placeholder={namePlaceholder}
                type="text"
                value={nameState}
                minLength={1}
                required
                onChange={onNameChange}
                onFocus={onNameFocus}
                onBlur={onNameBlur}
            />
        </p>
        <p>
            <input
                className={styles.formElement}
                placeholder={surnamePlaceholder}
                type="text"
                value={surNameState}
                minLength={1}
                required
                onChange={onSurNameChange}
                onFocus={onSurNameFocus}
                onBlur={onSurNameBlur}
            />
        </p>
        <p>
            <input
                className={styles.formElement}
                placeholder={agePlaceholder}
                type="number"
                value={ageState}
                required
                min={0}
                onChange={onAgeChange}
                onFocus={onAgeFocus}
                onBlur={onAgeBlur}
            />
        </p>
        <p>
            <input
                className={styles.formElement}
                required
                value={cityState}
                onChange={onCityChange}
                placeholder={cityPlaceholder}
                list="citiesList"
                onFocus={onCityFocus}
                onBlur={onCityBlur}
            />
            <datalist id="citiesList">{listOfCities.map((city) =>
                (<option key={city} value={city}>{city}</option>))}</datalist>
        </p>
        {confirmIsExpected
            ? <button className={styles.confirmButton} type="submit" disabled={!isFormValid}>
                Agree
            </button>
            : <button className={styles.submitButton} type="submit" disabled={!isFormValid}>
                {props.data ? "Update" : "Add"}
            </button>
        }
    </form>;
}

export function PopupForm(props: FillingFormProps) {
    if (!props.data) {
        return null;
    }
    return <div className={styles.popup}>
        <FillingForm  {...props} needConfirmation={true} />
    </div>;
}
