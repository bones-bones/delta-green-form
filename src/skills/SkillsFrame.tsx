import styled from '@emotion/styled';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { selectSkills } from './selectors';

export const SkillsFrame = () => {
    const skills = useSelector(selectSkills);
    const dispatch = useDispatch();

    return (
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
                        {entry.value}
                    </SkillEntry>
                );
            })}
        </Table>
    );
};

const Table = styled.div({
    color: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: '200px',
});

const SkillEntry = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '33%',
    border: '1px solid green',
});

const SkillName = styled.span({});

const FailedBox = styled.input();
