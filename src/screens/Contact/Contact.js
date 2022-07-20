import React, { useEffect } from 'react';
import {
  Grid,
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Card,
} from '@nextui-org/react';
import {
  MdRemoveRedEye,
  MdOutlineModeEditOutline,
  MdDeleteOutline,
} from 'react-icons/md';
import TableContact from '../../components/TableContact/TableContact';
import classes from './Contact.module.css';

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'ROLE', uid: 'role' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ACTIONS', uid: 'actions' },
];
const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    age: '29',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Technical Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Senior Developer',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'Community Manager',
    team: 'Marketing',
    status: 'vacation',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Sales Manager',
    team: 'Sales',
    status: 'active',
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
];

const Contact = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
            {user.email}
          </User>
        );
      case 'role':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
                {user.team}
              </Text>
            </Row>
          </Col>
        );
      case 'status':
        return <Text>{cellValue}</Text>;

      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Details">
                <MdRemoveRedEye size={20} />
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Edit user">
                <MdOutlineModeEditOutline size={20} />
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Delete user"
                onClick={() => console.log('Delete user', user.id)}
              >
                <MdDeleteOutline size={20} />
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Grid.Container css={{ paddingBottom: 30 }}>
      <Grid sm={6.5}>
        <div className={classes.main}>
          <Card
            css={{
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Text h2 css={{ margin: 0 }}>
              Manager owner contact
            </Text>
          </Card>
          <Card>
            <Table
              aria-label="Example table with custom cells"
              color={'warning'}
              css={{
                height: 'auto',
                width: '100%',
              }}
              selectionMode="single"
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column
                    key={column.uid}
                    hideHeader={column.uid === 'actions'}
                    align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                    {column.name}
                  </Table.Column>
                )}
              </Table.Header>
              <Table.Body items={users}>
                {(item) => (
                  <Table.Row>
                    {(columnKey) => (
                      <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                    )}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Card>
        </div>
      </Grid>
      <Grid sm={5.5}>
        <Card
          css={{
            padding: 20,
          }}
        >
          {/* <TableContact /> */}
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default Contact;
