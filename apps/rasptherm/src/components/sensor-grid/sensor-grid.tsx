import { Container, Grid } from '@mui/material';
import Sensor from '../sensor/sensor';

function SensorGrid() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Sensor sensorLocation="Bedroom" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SensorGrid;
