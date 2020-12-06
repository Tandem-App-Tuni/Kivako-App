import React from 'react'
import NewsCard from '../components/NewsCard'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme'

configure({adapter: new Adapter()});

it("renders correctly", () => {
    const wrapper = shallow(<NewsCard />);
    expect(wrapper).toMatchSnapshot();
})