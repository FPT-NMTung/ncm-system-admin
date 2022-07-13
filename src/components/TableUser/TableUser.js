import { Card, Table, Loading, Button } from "@nextui-org/react";
import classes from "./TableUser.module.css";
import { IoReloadCircleSharp } from "react-icons/io5";

const TableUser = ({ dataUser, onButtonReloadClick }) => {
  const columns = [
    {
      key: "id",
      label: "Id",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const rows = dataUser.children;
  return (
    <div className={classes.main}>
      <Card
        css={{
          marginBottom: 20,
          padding: 20,
        }}
      >
        <div className={classes.header}>
          <h2 className={classes.title}>Manager user</h2>
        </div>
      </Card>
      <Card>
        {rows && (
          <Table
            aria-label="Example dynamic collection table with color selection"
            color={"warning"}
            selectionMode="single"
            shadow={false}
            containerCss={{
              height: "auto",
              width: "100%",
            }}
          >
            <Table.Pagination
              color={"warning"}
              align="start"
              rowsPerPage={10}
              onPageChange={(page) => console.log({ page })}
            />
            <Table.Header columns={columns}>
              {(column) => (
                <Table.Column key={column.key}>{column.label}</Table.Column>
              )}
            </Table.Header>
            <Table.Body items={rows}>
              {(item) => (
                <Table.Row key={item.key}>
                  {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
        {!rows && (
          <div className={classes.loading}>
            <Loading color={"warning"} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default TableUser;
