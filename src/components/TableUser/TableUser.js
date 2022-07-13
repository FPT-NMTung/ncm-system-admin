import { Card, Table, Grid } from "@nextui-org/react";
import classes from "./TableUser.module.css";

const TableUser = () => {
  const columns = [
    {
      key: "name",
      label: "Name",
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
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];
  return (
    <div className={classes.main}>
      <Card
        css={{
          marginBottom: 20,
          padding: 20,
        }}
      >
        <h2 className={classes.title}>Manager user</h2>
        
      </Card>
      <Card>
        <Table
          aria-label="Example dynamic collection table with color selection"
          color={"primary"}
          selectionMode="multiple"
          defaultSelectedKeys={["2"]}
          containerCss={{
            height: "auto",
            width: "100%",
          }}
        >
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
          <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={10}
            onPageChange={(page) => console.log({ page })}
          />
        </Table>
      </Card>
    </div>
  );
};

export default TableUser;
