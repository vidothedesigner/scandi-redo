import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import Logo from '../../images/VSFlogo.svg';
import CartImage from '../../images/Cart.svg';

// components
import Currencies from '../Currencies/Currencies';
import Cart from '../Cart/Cart';

// query
import { getCategoriesQuery } from '../../queries/queries';

class Navbar extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isVisible : false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleViewCart = this.handleViewCart.bind(this);
    }

    displayCategories() {
        let data = this.props.data;
        if(data.loading){
            return( <div>Loading menu...</div> );
        } else {
            return data.categories.map(category => {
                return (
                    <li key={ category.name }>
                      <Link to={ '/'+category.name }>{ category.name }</Link>
                    </li>
                )
            })
        }
    }

    handleClick() { !this.state.isVisible ? this.setState({ isVisible: true }) : this.setState({ isVisible: false }) }

    handleViewCart(e) { this.setState({ isVisible: false }) }

    componentDidUpdate() {
        if(Object.entries(this.props.cart).length === 0) this.setState({ isVisible: false });
        this.props.onCartClick( this.state.isVisible );
        this.state.isVisible ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }

    render() { 
        let count = 0;
        Object.values(this.props.cart).map(product => count = count + product.count);
        const { changeCurrency, currencyState, cart, onAdd, onRemove } = this.props;
        return ( <>
            <header className="header">
                <div className="leftDiv">
                    <ul>
                        { this.displayCategories() }
                    </ul>
                </div>
                <div className="midDiv">
                    <Link to="/"><img src={ Logo } alt="Company Logo" /></Link>    
                </div>
                <div className="rightDiv">
                    <Currencies changeCurrency={ changeCurrency } currencyState={ currencyState } />
                    <div className="navCart" onClick={ () => this.handleClick() }>
                        <img src={ CartImage } alt="Small Cart" />
                        { count !== 0 && <div className="navCount"><span>{count}</span></div>}
                    </div>
                    
                    { this.state.isVisible ? <div className="navCartItems"><Cart cart={ cart } currencyState={ currencyState } isBag={ true } onAdd={ onAdd } onRemove={ onRemove } onChekout={ this.props.onChekout } handleViewCart={ this.handleViewCart } /></div> : ''}
                </div>
            </header>
            { this.state.isVisible && <div className="overlay" onClick={ this.handleViewCart } ></div> }
            </>
         );
    }
}
 
export default graphql(getCategoriesQuery)(Navbar);