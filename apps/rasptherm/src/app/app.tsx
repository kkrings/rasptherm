import { Container, CssBaseline, Grid } from '@mui/material';

import Sensor from '../components/sensor/sensor';

export function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Sensor
              sensorLocation="Bedroom"
              sensorReadoutDatetime={new Date()}
              sensorReadoutTemperature={21}
              sensorReadoutHumidity={60}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
