import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavigationItems from "./NavigationItems";

configure({ adapter: new Adapter() });
describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  //write the test
  it("should render two <NavigationItem /> elements if not authenticated", () => {
    //create an instance of the component as it will be rendered to the DOM
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it("should render three <NavigationItem /> elements if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it("should render Logout <NavigationItem /> element  if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
