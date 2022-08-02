import { Table } from '@nextui-org/react';
import React from 'react';
import classes from './TableContactUser.module.css';
import { MdOutlineFiberNew } from 'react-icons/md';

const TableContactUser = ({ listContact }) => {
    return (
        <Table
            aria-label="Example table with custom cells"
            color={'primary'}
            css={{
                height: 'auto',
                width: '100%',
            }}
        >
            <Table.Header>
                <Table.Column>Name</Table.Column>
                <Table.Column>Company</Table.Column>
                <Table.Column></Table.Column>
                <Table.Column>Is active</Table.Column>
            </Table.Header>
            <Table.Body>
                {listContact.map((item) => {
                    return (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.company}</Table.Cell>
                            <Table.Cell>{item.is_new ?<MdOutlineFiberNew size={25} color="#FF0000"/> : undefined}</Table.Cell>
                            <Table.Cell>
                                <span
                                    className={`${item.active
                                            ? classes.activeTable
                                            : classes.deactiveTable
                                        }`}
                                >
                                    {item.active ? 'Active' : 'Deactive'}
                                </span>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
            <Table.Pagination noMargin shadow align='center' rowsPerPage={10} />
        </Table>
    );
};

export default TableContactUser;
