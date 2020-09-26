import React from 'react';
import App from '../client/src/App';
import enzyme, { mount } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });
describe('<App />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<App />);
    });
    
    test('renders the App component', () => {
        expect(wrapper.find('App')).toHaveLength(1);
    });

    test('tests that a ReviewTile component is rendered', () => {
        expect(wrapper.find('ReviewTile')).toBeTruthy();
    });
});