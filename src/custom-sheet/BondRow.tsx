

import React, { createRef } from 'react';
import { NumericInput } from './numeric-input';
import { TextInput } from './text-input';

export type PartialBond = {
    name: string;
    score: number;
    history?: string;
};
export const BondRow = ({
    name,
    score,
    history,
    onChange,
    onRemove,
}: PartialBond & {
    onChange: (arg: PartialBond) => void;
    onRemove: () => void;
}) => {
    const nameRef = createRef<HTMLInputElement>();
    const historyRef = createRef<HTMLInputElement>();
    const numericRef = createRef<HTMLInputElement>();

    const updateFunc = () => {
        if (
            nameRef.current?.value &&
            historyRef.current?.value &&
            numericRef.current?.value
        ) {
            onChange({
                name: nameRef.current.value,
                score: parseInt(numericRef.current.value || '0'),
                history: historyRef.current.value,
            });
        }
    };

    return (
        <tr key={name}>
            <td>
                <TextInput
                    defaultValue={name}
                    ref={nameRef}
                    onBlur={updateFunc}
                />
            </td>
            <td>
                <TextInput
                    defaultValue={history}
                    ref={historyRef}
                    onBlur={updateFunc}
                />
            </td>
            <td>
                <NumericInput
                    type="text"
                    ref={numericRef}
                    onBlur={updateFunc}
                    maxLength={2}
                    size={2}
                    required
                    defaultValue={score!=0?score:undefined}
                    onFocus={(event) => event.target.select()}
                />
            </td>
            <td>
                <button onClick={onRemove}>remove</button>
            </td>
        </tr>
    );
};
