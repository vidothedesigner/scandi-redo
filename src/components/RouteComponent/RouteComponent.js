import { PureComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';

// components
import Home from '../Home/Home';
import Categories from '../Categories/Categories';
import Single from '../Single/Single';
import Cart from '../Cart/Cart';

// queries
import { getCategoriesQuery } from '../../queries/queries';

class RouteComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            productId: ''
        }

        this.getProductId = this.getProductId.bind(this);
        this.catRoutes = this.catRoutes.bind(this);
        this.productRoutes = this.productRoutes.bind(this);

    }
    catRoutes() {
        let data = this.props.data;
        if(data.loading) {
            return <Route path='/' element={ <Home/> } />
        } else {
            return data.categories.map( (category, i )=> <Route key={ i } path={ '/'+ category.name } element={ <Categories category={ category.name } getProductId={ this.getProductId } productId={this.state.productId} currencyState={ this.props.currencyState } addToCart={ this.props.addToCart }  /> } /> );
        }
    }
    productRoutes(){
        let data = this.props.data;
        if(data.loading) {
            return <Route path='/' element={ <Home/> } />
        } else {
            return data.categories.map( (category, i )=> <Route key={ i } path={ '/'+ category.name + '/*' } element={ <Single productId={ this.state.productId }  currencyState={ this.props.currencyState } addToCart={ this.props.addToCart } /> } /> );
        }
    }

    getProductId(productId) {
        this.setState({ productId })
    }
    componentDidUpdate() {
        this.state.productId === '' && this.setState({productId:`${window.location.pathname.match(/(\w*([a-zA-Z0-9]-)\w*){1,10}$/gi)}`})
    }
    render() {
        return (
            <Routes>
                <Route path='/' element={ <Home/> } />
                { this.catRoutes() }
                { this.productRoutes() }
                <Route path={"/cart"} element={ <Cart cart={ this.props.cart } currencyState={ this.props.currencyState } onAdd={ this.props.onAdd } onRemove={ this.props.onRemove } onChekout={ this.props.onChekout } /> }  />
            </Routes>
        )
    }
}

export default graphql(getCategoriesQuery)(RouteComponent);
