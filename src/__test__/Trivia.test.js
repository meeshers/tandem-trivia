import { render } from '@testing-library/react';
import {shallow} from 'enzyme';
import Triva from '../components/Trivia';
import Question from '../components/Question'

it('renders the question', () =>{
  shallow(<Question />);
  
})