import React, { Component } from 'react';
import { Table } from '@nextui-org/react';

import classes from './TableContact.module.css';

const TableContact = ({ data, onSelectColumn }) => {
  return (
    <Table
      aria-label="Example table with custom cells"
      selectionMode="single"
      onSelectionChange={onSelectColumn}
      color={'warning'}
      css={{
        height: 'auto',
        width: '100%',
      }}
    >
      <Table.Header>
        <Table.Column>Id</Table.Column>
        <Table.Column>Name</Table.Column>
        <Table.Column>Email</Table.Column>
        <Table.Column>Role</Table.Column>
        <Table.Column>Email manager</Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>
                {item.role_id === 1
                  ? 'Staff'
                  : item.role_id === 2
                  ? 'Manager'
                  : item.role_id === 3
                  ? 'Marketer'
                  : 'Administrator'}
              </Table.Cell>
              <Table.Cell>
                {item.manager === null ? <span className={classes.emailManager}>(Not setup)</span> : item.manager}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
      <Table.Pagination align="right" rowsPerPage={10} />
    </Table>
  );
};

export default TableContact;
