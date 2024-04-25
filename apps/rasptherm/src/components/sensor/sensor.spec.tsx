import { render } from '../../test-utils/render';
import Sensor from './sensor';

describe('Sensor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sensor sensorLocation="Some location" />);
    expect(baseElement).toBeTruthy();
  });
});
