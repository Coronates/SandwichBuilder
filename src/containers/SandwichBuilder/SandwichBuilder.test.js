import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SandwichBuilder } from "./SandwichBuilder";
import BuildControls from "../../components/Sandwich/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<SandwichBuilder / >", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SandwichBuilder onInitIngredient={()=>{}}/>);
  });
  it('should render <BuildControls /> when receiving ings',()=>{
      wrapper.setProps({ings:{salad:0}});
      expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
