import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddRowButton, SectionHeader } from '../components';
import { StyledButton } from '../components/AddRowButton';
import { actions } from './reducer';
import { selectInventory } from './selectors';
import { Item } from './types';

export const InventoryFrame = () => {
    const items = useSelector(selectInventory);
    const dispatch = useDispatch();
    const [newRow, setNewRow] = useState<Item | undefined>(undefined);

    const save = () => {
        if (newRow && isValidForSubmit(newRow)) {
            dispatch(actions.addItem(newRow));
            setNewRow(undefined);
        }
    };

    return (
        <>
            <SectionHeader>Inventory</SectionHeader>
            <ItemTable>
                <HeaderRow>
                    <TableHeadItem>Name</TableHeadItem>
                    <TableHeadItem>Description</TableHeadItem>
                    <TableHeadItem>Count</TableHeadItem>
                    <TableHeadItem>Delete</TableHeadItem>
                </HeaderRow>
                {Object.values(items).map((entry, index) => {
                    return (
                        <Entry key={entry.name}>
                            <Cell>
                                <Name
                                    type="text"
                                    value={entry.name}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            actions.updateItem({
                                                index,
                                                item: {
                                                    ...entry,
                                                    name: value,
                                                },
                                            })
                                        );
                                    }}
                                />
                            </Cell>
                            <Cell>
                                <Description
                                    type="text"
                                    value={entry.description}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            actions.updateItem({
                                                index,
                                                item: {
                                                    ...entry,
                                                    description: value,
                                                },
                                            })
                                        );
                                    }}
                                />
                            </Cell>
                            <Cell>
                                <NumberValue
                                    value={entry.count}
                                    onChange={({ target: { value } }) => {
                                        dispatch(
                                            actions.updateItem({
                                                index,
                                                item: {
                                                    ...entry,
                                                    count: parseInt(value),
                                                },
                                            })
                                        );
                                    }}
                                />
                            </Cell>
                            <Cell>
                                <StyledButton
                                    onClick={() =>
                                        dispatch(actions.removeItem(index))
                                    }
                                >
                                    remove row
                                </StyledButton>
                            </Cell>
                        </Entry>
                    );
                })}
                {newRow && (
                    <Entry key={'blank'}>
                        <Cell>
                            <Name
                                onChange={({ target: { value } }) => {
                                    //dispatch();
                                    setNewRow({ ...newRow, name: value });
                                }}
                                onBlur={save}
                            />
                        </Cell>
                        <Cell>
                            <Description
                                type="text"
                                onChange={({ target: { value } }) => {
                                    //dispatch();
                                    setNewRow({
                                        ...newRow,
                                        description: value,
                                    });
                                }}
                                onBlur={save}
                            />
                        </Cell>
                        <Cell>
                            <NumberValue
                                onChange={({ target: { value } }) => {
                                    if (value) {
                                        setNewRow({
                                            ...newRow,
                                            count: parseInt(value || '0'),
                                        });
                                    }
                                }}
                                onBlur={save}
                            />
                        </Cell>
                        <Cell>
                            <StyledButton onClick={() => setNewRow(undefined)}>
                                remove row
                            </StyledButton>
                        </Cell>
                    </Entry>
                )}
            </ItemTable>
            <AddRowButton
                onClick={() => {
                    setNewRow({ name: '', description: '' });
                }}
            />
        </>
    );
};

const isValidForSubmit = (item: Item) => {
    return item.name && item.description;
};

const TableHeadItem = styled.th({ textAlign: 'left' });

const Cell = styled.td({ borderTop: '1px solid white' });

const HeaderRow = styled.tr({ height: '15px' });

const NumberValue = styled.input({
    ':focus': {
        backgroundColor: 'green',
    },
    boxSizing: 'border-box',
    backgroundColor: '#002200',
    color: 'white',
    fontSize: '16px',
    border: '1px solid white',
    borderRadius: '5px',
    textAlign: 'center',
    fontWeight: 'bold',
    width: '30px',
});

const Description = styled.input(({ value }) => ({
    boxSizing: 'border-box',
    backgroundColor: '#002200',
    ':focus': {
        backgroundColor: 'green',
        border: '1px solid green',
        overflow: 'auto',
    },
    color: 'white',
    fontSize: '16px',
    ...(!value ? { border: '1px solid white' } : { border: 'none' }),

    borderRadius: '5px',
    textAlign: 'center',
    width: '150px',
    overflow: 'hidden',
}));

const ItemTable = styled.table({
    color: 'white',
    width: '100%',
    margin: 0,
    padding: 0,
});

const Entry = styled.tr({
    border: '1px solid green',
    backgroundColor: '#002200',
    height: '30px',
});

const Name = styled.input(({ value }) => ({
    fontWeight: 'bold',
    boxSizing: 'border-box',
    backgroundColor: '#002200',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    textAlign: 'center',
    ...(!value ? { border: '1px solid white' } : { border: 'none' }),
    ':focus': {
        backgroundColor: 'green',
        border: '1px solid green',
        overflow: 'auto',
    },
}));
