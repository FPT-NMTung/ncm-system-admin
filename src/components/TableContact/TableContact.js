import React, { Component } from 'react';
import { Table, Loading, Tooltip } from '@nextui-org/react';
import { HiCheckCircle } from 'react-icons/hi';
import { IoMdCloudUpload } from 'react-icons/io';
import { MdOutlineError } from 'react-icons/md';

import classes from './TableContact.module.css';

const TableContact = (props) => {
  const { data, onSelectColumn } = props;

  return (
    <Table
      aria-label="Example table with custom cells"
      selectionMode="single"
      onSelectionChange={onSelectColumn}
      color={'primary'}
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
        <Table.Column>
          <div className={classes.icon}>
            <IoMdCloudUpload size={20} />
          </div>
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {data.map((item) => {
          return (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>
                {item.role_id === 1
                  ? 'Staff'
                  : item.role_id === 2
                  ? 'Manager'
                  : item.role_id === 3
                  ? 'Sale Director'
                  : 'Administrator'}
              </Table.Cell>
              <Table.Cell>
                {item.manager === null ? (
                  <span className={classes.emailManager}>(Not setup)</span>
                ) : (
                  item.manager
                )}
              </Table.Cell>
              <Table.Cell>
                <div className={classes.icon}>
                  {item.status === 2 && <Tooltip color={'success'} content="Success"><HiCheckCircle color="1fb848" size={16} /></Tooltip>}
                  {item.status === 3 && <Tooltip color={'error'} content="Error"><MdOutlineError color="f23a65" size={16} /></Tooltip>}
                  {item.status === 4 && <Tooltip content="Pending ..."><Loading color={'success'} size="xs" /></Tooltip>}
                  {item.status === 1 && <div/>}
                </div>
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
