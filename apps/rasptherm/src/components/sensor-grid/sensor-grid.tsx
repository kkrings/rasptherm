import { Container, Grid } from '@mui/material';
import { useSensor } from '../../hooks/sensor';
import Sensor from '../sensor/sensor';

function SensorGrid() {
  const { sensorReadout, refreshSensorReadout } = useSensor();

  return (
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
  );
}

export default SensorGrid;
