import { Card, Table, Loading, Tooltip } from '@nextui-org/react';
import { TbEdit } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import classes from './TableUser.module.css';

const TableUser = ({ dataUser, onButtonReloadClick }) => {
  const columns = [
    {
      key: 'id',
      label: 'id',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'Role',
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'action',
      label: 'Action',
    },
  ];

  const rows = dataUser.children;
  return (
    <div className={classes.main}>
      <Card
        css={{
          marginBottom: 20,
        }}
      >
        <div>
          <h3 className={classes.titleManage}>Manager information:</h3>

          <Table
            color={'warning'}
            selectionMode="none"
            shadow={false}
            containerCss={{
              height: 'auto',
              width: '100%',
            }}
          >
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{dataUser.id}</Table.Cell>
                <Table.Cell>{dataUser.name}</Table.Cell>
                <Table.Cell>{dataUser.email}</Table.Cell>
                <Table.Cell>
                  {dataUser.role_id === 1
                    ? 'Staff'
                    : dataUser.role_id === 2
                    ? 'Manager'
                    : dataUser.role_id === 3
                    ? 'Sale Director'
                    : ''}
                </Table.Cell>
                <Table.Cell>
                  {dataUser.isActive && (
                    <div className={classes.active}>Active</div>
                  )}
                  {!dataUser.isActive && (
                    <div className={classes.deactive}>Deactive</div>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Link to={'/user/' + dataUser.id}>
                    <Tooltip
                      className={classes.tooltip}
                      placement="top"
                      content="Edit user"
                      color="invert"
                    >
                      <TbEdit color="11181c" size={20} />
                    </Tooltip>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Card>
      <Card>
        <h3 className={classes.titleTable}>
          List user managed by:
          <span>
            {' '}
            {dataUser.name} ({dataUser.email})
          </span>
        </h3>
        {rows && (
          <Table
            aria-label="Example dynamic collection table with color selection"
            color={'warning'}
            selectionMode="none"
            shadow={false}
            containerCss={{
              height: 'auto',
              width: '100%',
            }}
          >
            <Table.Pagination
              color={'warning'}
              align="start"
              rowsPerPage={10}
            />
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item) => (
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
                      : ''}
                  </Table.Cell>
                  <Table.Cell>
                    {item.isActive && (
                      <div className={classes.active}>Active</div>
                    )}
                    {!item.isActive && (
                      <div className={classes.deactive}>Deactive</div>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={'/user/' + item.id}>
                      <Tooltip
                        className={classes.tooltip}
                        placement="top"
                        content="Edit user"
                        color="invert"
                      >
                        <TbEdit color="11181c" size={20} />
                      </Tooltip>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
        {!rows && (
          <div className={classes.loading}>
            <Loading color={'warning'} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default TableUser;
