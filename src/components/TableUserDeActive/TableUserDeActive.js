import { Table } from '@nextui-org/react';
import React from 'react';

const TableUserDeActive = ({ listUser, onSelectColumn }) => {
    return (
        <Table
            aria-label="Example table with custom cells"
            color={'warning'}
            css={{
                height: 'auto',
                width: '100%',
            }}
            onSelectionChange={onSelectColumn}
            selectionMode="single"
        >
            <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Role</Table.Column>
            </Table.Header>
            <Table.Body>
                {listUser.map((item) => {
                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.role_id === 1 ? 'Staff' : (item.role_id === 2 ? 'Manager' : 'Sale Director')}</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
            <Table.Pagination align='start' rowsPerPage={10} />
        </Table>
    );
};

export default TableUserDeActive;
