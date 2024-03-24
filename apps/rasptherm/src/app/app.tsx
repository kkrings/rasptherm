import {
  AppBar,
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import { useSensor } from '../hooks/sensor';
import Sensor from '../components/sensor/sensor';
import ThemeMode from '../components/theme-mode/theme-mode';
import { useCreateTheme } from '../hooks/theme';

export function App() {
  const theme = useCreateTheme();
  const { sensorReadout, refreshSensorReadout } = useSensor();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: '1rem' }}>
        <Toolbar>
          <ThemeMode />
        </Toolbar>
      </AppBar>
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
    </ThemeProvider>
  );
}

export default App;
