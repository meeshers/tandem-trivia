import {shallow} from 'enzyme';
import App from './App';

it('render without crashing', () => {
  shallow(<App />);
});
