import { PureComponent } from 'react';
import { Link } from 'react-router-dom';

//components
import Product from '../Product/Product';

class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 0,
            total: 0
        }

        this.fillState = this.fillState.bind(this);
        this.displayCartProducts = this.displayCartProducts.bind(this);
    }
    fillState() {
        let quantity = 0;
        let total = 0;
        Object.entries(this.props.cart).forEach(item => {
            let prices = item[1].prices.filter( price => price.currency.label === this.props.currencyState.label )
            total = total+(item[1].count * prices[0].amount)
            quantity = quantity + item[1].count
        });

        total = Number(total.toFixed(2));
        this.setState({
            ...this.state,
            quantity,
            total
        });
    }
    displayCartProducts() {
        const { currencyState, cart, onAdd, onRemove, isBag } = this.props;
        return Object.entries(cart).map((item, i) => {
            return <div key={i}><Product product={ item[0] } itemValues={ item[1] } currencyState={ currencyState } location='inCart' onAdd={ onAdd } onRemove={ onRemove } isBag={ isBag } /></div>;
        })
    }
    paymentTotals() {
        return this.state.quantity !== 0 && (<div className="paymentTotals">
                { !this.props.isBag && <><span>Tax 21%: <strong>{ this.props.currencyState.symbol }{ Number((this.state.total * 21)/100).toFixed(2) }</strong> </span> <br /></>} 
                { !this.props.isBag && <><span>Quantity: <strong>{ this.state.quantity }</strong> </span> <br /></> }
                <span>Total: <strong>{ this.props.currencyState.symbol }{ this.state.total }</strong> </span><br />
            </div>);
    }
    componentDidMount() { this.fillState() }
    componentDidUpdate() { this.fillState() }
    render() {
        return (
            <div>
                { this.props.isBag ? <h1 className="bagHeading">My Bag, <span>{`${this.state.quantity}`} items</span></h1> : <h1 className="cartHeading">Cart { this.state.quantity === 0 && 'is empty' }</h1> }
                { this.displayCartProducts() }
                { this.paymentTotals() }
                { this.state.quantity !== 0 && <div className="buttonContainer">
                    { this.props.isBag && <Link to="/cart" onClick={ this.props.handleViewCart } className="button whiteButton">View Cart</Link> }
                    <button className={`button greenButton ${ this.props.isBag && 'isBag' }`} onClick={ this.props.onChekout }>{ this.props.isBag ? 'Chekout' : 'Order'}</button>
                </div>}

            </div>
        )
    }
}

export default Cart;