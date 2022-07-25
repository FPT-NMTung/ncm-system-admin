import { Grid, Card, Text } from "@nextui-org/react";
import { useEffect } from "react";
import SelectCustom from '../../CommonComponent/SelectCustom/SelectCustom';
import classes from './UserDetail.module.css';

const UserDetail = ({ title }) => {
  useEffect(() => {
    document.title = title
  })

  return (
    <div>
      <Grid.Container>
        <Grid sm={6.5}>
          <div className={classes.main}>
          <Card
              css={{
                marginBottom: 20,
                padding: 20,
              }}
            >
              <Text h2 css={{ margin: 0 }}>
                User Detail
              </Text>
            </Card>
            <Card>
              <div className={classes.loadingUser}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>
            </Card>
          </div>
        </Grid>
        <Grid sm={5.5}>
          <Card>
            <div className={classes.loadingContact}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>
          </Card>
        </Grid>
      </Grid.Container>
      <SelectCustom/>
    </div>
  );
};

export default UserDetail;
