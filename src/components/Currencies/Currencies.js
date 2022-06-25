import { PureComponent } from 'react';
import { graphql } from '@apollo/react-hoc';
import Arrow from '../../images/Arrow.svg';

// queries
import { currencies } from '../../queries/queries';

class Currencies extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        }
    }

    displayCurencySelector() {
        const data = this.props.data;
        if(data.loading) {
            return <div>Loading...</div>
        } else {
            const { currencies } = this.props.data;
            return (
                <>
                    <div className="customSelected" onClick={ () => this.setState({ isVisible: true })} >
                        <span className="selectedCurrency">{ this.props.currencyState.symbol }</span>
                        <span className={`arrow ${ this.state.isVisible ? 'opened' : 'closed' }`}><img src={ Arrow } alt="" /></span>
                    </div>
                    { this.state.isVisible && <div className="customItemsToSelect">{ currencies.map( (currency, i) => (<div key={i} className="currencyItems" onClick={ () => { 
                        this.props.changeCurrency({ label:currency.label, symbol: currency.symbol });
                        this.setState({ isVisible:false })
                    } }><div className="currenciesContainer">
                            <span className="symbol">{ currency.symbol }</span>
                            <span>{ currency.label }</span>
                        </div>
                        </div>)) }</div> }
                </>
            )
        }
    }

    componentDidUpdate() { this.props.currencyState.label === '' && this.props.changeCurrency({ label: this.props.data.currencies[0].label, symbol: this.props.data.currencies[0].symbol })
}

    render() { 
        return ( 
            <div className="customSelectContainer" onMouseLeave={ () => this.setState({ isVisible: false }) }>
                { this.displayCurencySelector() }
            </div>
         );
    }
}

export default graphql(currencies)(Currencies);