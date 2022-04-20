import Enzyme, { shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ProductSearchBar from './ProductSearchBar'
import ShoppingListView from '../ShoppingLists/ShoppingListView';
import Navbar from '../../NavBar/Navbar'

Enzyme.configure({ adapter: new Adapter() });


// testing that parent and child components render successfully
test("ProductSearchView renders successfully", () => {
    shallow(<ShoppingListView pageIndex={0} />)
})

test("Navbar renders successfully", () => {
    shallow(<Navbar />)
})

test("Search bar renders successfully", () => {
    const handleSearchTextChange = (event) => {}
    shallow(<ProductSearchBar handleSearchTextChange={handleSearchTextChange}/>)
})
