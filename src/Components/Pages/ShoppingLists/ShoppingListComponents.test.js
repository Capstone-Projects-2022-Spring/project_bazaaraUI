import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import { mount } from 'enzyme/build';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ShoppingListView from './ShoppingListView'
import ShoppingListDisplay from './ShoppingListDisplay'
import ShoppingListSelection from './ShoppingListSelection'
import Product from './Product'
import ListManagementDropdown from './ListManagementDropdown'
import { ShoppingListCollection } from './ShoppingList';

Enzyme.configure({ adapter: new Adapter() });

// testing that parent and child components render successfully
test("ShoppingListView renders successfully", () => {
    shallow(<ShoppingListView pageIndex={1}/>);
})

test("Product card renders successfully", () => {
    shallow(<Product />);
})

test("3 dot dropdown renders successfully", () => {
    shallow(<ListManagementDropdown />);
})

test("changeListHandler should swap to second list", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().changeListHandler(1)).toBe(1)
})

test("handleAddList creates new list", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().handleAddList("dessert")).toBe("dessert")
})

test("renameList actually changes the list name", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().renameList("on sale")).toBe("on sale")
})

test("handleRemoveList actually removes the list", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().handleRemoveList()).toBe(0)
})

test("handleAddProduct actually adds product", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().handleAddProduct("Goldfish", 8, 0, "Target")).toBe(0)
})

test("handleRemoveProduct actually removes product", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().handleRemoveProduct(3)).toBe(0);
})

// testing calculation of total shopping list price
test("total list price should be $8.97", () => {
    const wrapper = shallow(<ShoppingListView pageIndex={1} />);
    expect(wrapper.instance().calculateTotalListPrice(ShoppingListCollection.collection[0].productCollection)).toBe('8.97')
})