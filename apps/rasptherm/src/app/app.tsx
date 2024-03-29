import { Container, CssBaseline, Grid } from '@mui/material';
import { useSensor } from '../hooks/sensor';
import Sensor from '../components/sensor/sensor';

export function App() {
  const { sensorReadout, refreshSensorReadout } = useSensor();

  return (
    <>
      <CssBaseline />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Sensor
              sensorLocation="Bedroom"
              sensorReadoutDatetime={new Date(sensorReadout.executedAtUtc)}
              sensorReadoutTemperature={sensorReadout.temperatureDegreeCelsius}
              sensorReadoutHumidity={sensorReadout.relativeHumidityPercent}
              onSensorReadoutRefresh={refreshSensorReadout}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
