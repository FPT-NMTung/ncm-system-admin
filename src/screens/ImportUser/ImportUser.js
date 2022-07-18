import { Card, Grid, Text } from '@nextui-org/react';
import { Table } from 'antd';
import { useEffect } from 'react';
import TableContact from '../../components/TableContact/TableContact';
import classes from './ImportUser.module.css';

const ImportUser = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Grid.Container css={{marginBottom: 20}}>
      <Grid.Container>
        <Grid sm={6.5}>
          <Card
            css={{
              marginRight: 20,
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Text h2 css={{ margin: 0 }}>Import user</Text>
          </Card>
        </Grid>
      </Grid.Container>
      <Grid sm={6.5}>
        <Card
          css={{
            marginRight: 20,
          }}>
          <TableContact />
        </Card>
      </Grid>
      <Grid sm={5.5}>
        <Card>

        </Card>
      </Grid>
    </Grid.Container>

  );
};

export default ImportUser;
