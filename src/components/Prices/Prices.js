import { PureComponent } from 'react';

class Prices extends PureComponent {
    render() {
        const prices = this.props.prices;
        return (
            <div className="priceTag">
                { this.props.location === 'inSingle' ? <h3>Price:</h3>: '' }
                <span>{ prices[0].currency.symbol }</span>
                <span>{ prices[0].amount }</span>
            </div>
        )
  }
}

export default Prices;