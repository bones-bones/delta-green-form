import styled from '@emotion/styled';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, selectStats } from '../stats';
import { getDistinguishingFeatures } from './getDistinguishingFeatures';
import { StatDescriptions, StatTypes } from './types';

export const StatFrame = () => {
    const initStats = useSelector(selectStats);
    const dispatch = useDispatch();

    const [stats, setStats] = useState(initStats);

    return (
        <>
            <table>
                <thead>
                    <StatRow>
                        <th>Stat</th> <th>Score</th> <th>Test</th>
                        <th>Description</th>
                    </StatRow>
                </thead>
                <tbody>
                    {Object.values(StatTypes).map((entry) => {
                        const { name, abbreviation } = StatDescriptions[entry];
                        const onChange =
                            (entry: StatTypes) =>
                            ({
                                target: { value },
                            }: ChangeEvent<HTMLInputElement>) => {
                                const val = parseInt(value) || 0;
                                if (stats[entry].value !== val) {
                                    setStats({
                                        ...stats,
                                        [entry]: {
                                            value: val,
                                            description:
                                                getDistinguishingFeatures(
                                                    entry,
                                                    val
                                                ),
                                        },
                                    });
                                }
                            };
                        return (
                            <StatRow key={entry}>
                                <td>{`${name} (${abbreviation})`}</td>
                                <td>
                                    <StatInput
                                        type="text"
                                        maxLength={2}
                                        onBlur={onChange(entry)}
                                        size={2}
                                        required
                                        defaultValue={
                                            stats[entry].value !== 0
                                                ? stats[entry].value
                                                : undefined
                                        }
                                        onFocus={(event) => {
                                            event.target.select();
                                        }}
                                    />
                                </td>
                                <Times5>{stats[entry].value * 5}</Times5>
                                <td>
                                    {stats[entry].value !== 0 &&
                                        stats[entry].description}
                                </td>
                            </StatRow>
                        );
                    })}
                </tbody>
            </table>
            <button
                onClick={() => {
                    dispatch(actions.loadInitial(stats));
                }}
            >
                Confirm
            </button>
        </>
    );
};
const StatInput = styled.input({
    backgroundColor: 'green',
    boxSizing: 'border-box',
    ':valid': {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
    },
    color: 'white',
    fontSize: '16px',
    border: '1px solid green',
    borderRadius: '5px',
    textAlign: 'center',
});

const StatRow = styled.tr({
    color: 'white',

    alignItems: 'center',
});

const Times5 = styled.td({ fontSize: '20px' });
