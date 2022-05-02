import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SectionHeader } from '../components';
import { actions } from './reducer';
import { selectPersonData } from './selectors';

export const PersonDataFrame = () => {
    const data = useSelector(selectPersonData);
    const [personDataState, setPersonDataState] = useState(data);
    const dispatch = useDispatch();

    return (
        <Container>
            <SectionHeader>Personal Data</SectionHeader>
            <FieldRow>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Name
                    type="text"
                    id="name"
                    defaultValue={personDataState.name}
                    disabled={!!data.name}
                    required
                    onBlur={({ target: { value } }) => {
                        setPersonDataState({ ...personDataState, name: value });
                    }}
                />
            </FieldRow>
            <FieldRow>
                <FieldLabel htmlFor="profession">Profession</FieldLabel>
                <Name
                    type="text"
                    id="profession"
                    defaultValue={personDataState.profession}
                    required
                    disabled={!!data.profession}
                    onBlur={({ target: { value } }) => {
                        setPersonDataState({
                            ...personDataState,
                            profession: value,
                        });
                    }}
                />
            </FieldRow>
            <FieldRow>
                <FieldLabel htmlFor="background">Background</FieldLabel>
                <TextAreaInput
                    id="background"
                    defaultValue={personDataState.background}
                    required
                    onBlur={({ target: { value } }) => {
                        setPersonDataState({
                            ...personDataState,
                            background: value,
                        });
                    }}
                />
            </FieldRow>

            {!data.name && (
                <button
                    disabled={
                        !(
                            personDataState.name &&
                            personDataState.profession &&
                            personDataState.background
                        )
                    }
                    onClick={() => dispatch(actions.setData(personDataState))}
                >
                    Confirm
                </button>
            )}
        </Container>
    );
};

const FieldLabel = styled.label({
    color: 'white',
    fontSize: '16px',
});

const FieldRow = styled.div({ display: 'flex', flexDirection: 'column' });

const Name = styled.input({
    fontWeight: 'bold',
    boxSizing: 'border-box',
    backgroundColor: 'green',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid transparent',
    ':focus': {
        backgroundColor: 'green',
        border: '1px solid white',
    },
    ':valid': {
        backgroundColor: '#002200',
        border: '1px solid transparent',
    },
    ':disabled': {
        backgroundColor: '#002200',
    },
});

const Container = styled.div({ flexGrow: 0.3 });

const TextAreaInput = styled.textarea({
    textAlign: 'left',
    fontWeight: 'bold',
    boxSizing: 'border-box',
    backgroundColor: 'green',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',

    resize: 'vertical',
    border: '1px solid transparent',
    ':focus': {
        backgroundColor: 'green',
        border: '1px solid white',
    },
    ':valid': {
        backgroundColor: '#002200',
        border: '1px solid transparent',
    },
});
