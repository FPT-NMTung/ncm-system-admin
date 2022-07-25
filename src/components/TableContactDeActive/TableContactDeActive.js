import { Table } from '@nextui-org/react';
import React from 'react';

const TableContactDeActive = ({ listContact, onSelectColumn }) => {
    return (
        <Table
            aria-label="Example table with custom cells"
            color={'primary'}
            css={{
                height: 'auto',
                width: '100%',
            }}
            onSelectionChange={onSelectColumn}
            selectionMode="multiple"
        >
            <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>Company</Table.Column>
            </Table.Header>
            <Table.Body>
                {listContact.map((item) => {
                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.company}</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
            <Table.Pagination align='center' rowsPerPage={10} />
        </Table>
    );
};

export default TableContactDeActive;
