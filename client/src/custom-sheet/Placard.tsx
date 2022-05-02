import styled from '@emotion/styled';
import React from 'react';

export const Placard = () => {
    return (
        <PlacardElement>
            <NameLabel htmlFor={'characterName'}>Name</NameLabel>
            <NameInput type="text" name="characterName" />
            <ProfessionLabel htmlFor={'characterProfession'}>
                Profession
            </ProfessionLabel>
            <ProfessionInput type="text" name="characterProfession" />
            <ProfessionLabel htmlFor={'characterBackground'}>
                Background
            </ProfessionLabel>
            <ProfessionInput type="text" name="characterBackground" />
        </PlacardElement>
    );
};

const PlacardElement = styled.div({
    backgroundColor: 'green',
    height: '12%',
    width: '94%',
    marginBottom: '2%',
    borderRadius: '15px',
});

const NameLabel = styled.label({});

const ProfessionLabel = styled.label({});

const NameInput = styled.input({
    margin: '10px',
    backgroundColor: 'transparent',
    fontSize: '20px',
    // border: 'none',
    // fontFamily: 'XFiles',
    border: '1px solid black',
    borderRadius: '5px',
});

const ProfessionInput = styled.input({
    margin: '10px',
    backgroundColor: 'transparent',
    fontSize: '20px',
    // border: 'none',
    // fontFamily: 'XFiles',
    border: '1px solid black',
    borderRadius: '5px',
});
