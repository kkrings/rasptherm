import SensorGrid from '../components/sensor-grid/sensor-grid';
import Topbar from '../components/topbar/topbar';
import WithTheme from '../components/with-theme/with-theme';

export function App() {
  return (
    <WithTheme>
      <Topbar />
      <SensorGrid />
    </WithTheme>
  );
}

export default App;
