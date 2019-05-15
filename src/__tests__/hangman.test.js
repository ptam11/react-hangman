	
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from "enzyme-to-json";
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";
import App from '../App';
import Hangman from '../Hangman';

import img0 from '../../src/0.jpg'
import img1 from '../../src/1.jpg'

configure({ adapter: new Adapter() });

it("App renders without crashing", function() {
  shallow(<App />);
});

it('Hangman Component renders without errors', function() {
  const div = document.createElement('div');
  ReactDOM.render(<Hangman />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("matches snapshot", function() {
  let wrapper = shallow(<Hangman />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it('it should should not change image on correct guess', function() {
  let wrapper = mount(<Hangman />);
  wrapper
    .find("button[value='a']")
    .simulate('click', {target: { value: "a" }})

  expect(wrapper.html()).toContain(img0)
});

it('it should render img1 after incorrect guess', function() {
  let wrapper = mount(<Hangman />);
  wrapper
    .find("button[value='z']")
    .simulate('click', {target: { value: "z" }})

  expect(wrapper.html()).toContain(img1)
  // expect(wrapper.exists('a')).toEqual(true);
  // expect(wrapper.html()).toContain("Think of a Question");
});


it('it should update number of wrong guesses', function() {
  let wrapper = mount(<Hangman />);
  wrapper
    .find("button[value='z']")
    .simulate('click', {target: { value: "z" }})

  expect(wrapper.state('nWrong')).toEqual(1);
  // expect(wrapper.exists('a')).toEqual(true);
  // expect(wrapper.html()).toContain("Think of a Question");
 
});

// it('renders correct message', function() {
//   let wrapper = mount(<EightBall />);
//   wrapper.setState({text: "Yes changing", color: "blue"});

//   expect(wrapper.exists('p')).toEqual(true);
//   expect(wrapper.html()).toContain("Yes changing");
//   expect(wrapper.html()).toContain("blue");

// });

// it('changes default message on click', function() {
//   let wrapper = mount(<EightBall />);
//   wrapper.find('#EightBall').simulate("click");

//   expect(wrapper.exists('p')).toEqual(true);
//   expect(wrapper.html()).not.toContain("Think of a Question");

// });

// it('changes message to thinking', function() {
//   let wrapper = mount(<EightBall />);
  
//   wrapper.setState({answers: [
//     { msg: "It is certain.", color: "green" },
//     { msg: "It is decidedly so.", color: "green" },
//   ]});
  
//   wrapper.find('#EightBall').simulate("click");
//   expect(wrapper.exists('p')).toEqual(true);

//   // Let the ball think for 1s
//     expect(wrapper.find("#message").html()).toContain("Thinking");

// });

// it('works with random messages', function() {
//   let wrapper = mount(<EightBall />);
  
//   wrapper.setState({answers: [
//     { msg: "It is certain.", color: "green" },
//     { msg: "It is decidedly so.", color: "green" },
//   ]});
  
//   wrapper.find('#EightBall').simulate("click");
//   expect(wrapper.exists('p')).toEqual(true);

//   // Let the ball think for 1s
//   setTimeout( () => {
//     expect(wrapper.find("#message").html()).toContain("It is");
//   }, 1000);

// });

// it('resets the ball to Question', function() {
//   let wrapper = mount(<EightBall />);
  
//   wrapper.setState({answers: [
//     { msg: "It is certain.", color: "green" },
//     { msg: "It is decidedly so.", color: "green" },
//   ]});
  
//   wrapper.find('#reset').simulate("click");
//   expect(wrapper.exists('p')).toEqual(true);

//   expect(wrapper.find("#message").html()).toContain("Think of a Question");

// });

