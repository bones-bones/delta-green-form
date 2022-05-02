import styled from '@emotion/styled';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionHeader } from '../components';
import { NumericInput } from '../custom-sheet/numeric-input';
import { skillsSetup } from './constants';
import { actions } from './reducer';
import { selectPointsToAllocate, selectSkills } from './selectors';

export const SkillsFrame = () => {
    const skills = useSelector(selectSkills);
    const pointsToAllocate = useSelector(selectPointsToAllocate);
    const dispatch = useDispatch();

    return (
        <>
            <SectionHeader>Skills</SectionHeader>
            {pointsToAllocate !== 0 && (
                <PointsToAllocateSpan>
                    remaining points to allocate: {pointsToAllocate}
                </PointsToAllocateSpan>
            )}
            <Table>
                {Object.values(skills).map((entry) => {
                    return (
                        <SkillEntry key={entry.name}>
                            <FailedBox
                                type="checkbox"
                                checked={entry.failedInSession}
                                onChange={() => {
                                    dispatch(
                                        actions.toggleSkill(entry.name as any)
                                    );
                                }}
                            />
                            <SkillName> {entry.name}</SkillName>
                            <NumericInput
                                type="number"
                                value={entry.value}
                                disabled={pointsToAllocate === 0}
                                onChange={({ target: { value } }) =>
                                    dispatch(
                                        actions.setSkill({
                                            name: entry.name as keyof typeof skillsSetup,
                                            value: parseInt(value),
                                        })
                                    )
                                }
                            />
                        </SkillEntry>
                    );
                })}
            </Table>
        </>
    );
};

const PointsToAllocateSpan = styled.span({ color: 'white' });

const Table = styled.div({
    color: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: '250px',
});

const SkillEntry = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '33%',
    border: '1px solid green',
});

const SkillName = styled.span({});

const FailedBox = styled.input();
