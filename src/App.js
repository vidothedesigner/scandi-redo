import { PureComponent } from 'react';
import { 
  ApolloClient,
  ApolloProvider,
  InMemoryCache
 } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import Navbar from './components/Navbar/Navbar';
import RouteComponent from './components/RouteComponent/RouteComponent';

// apollo client setup
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      cart: {},
      currency: {
        label: '',
        symbol: ''
      },
      isOverlayVisible: false
    };

    this.changeCurrency = this.changeCurrency.bind(this);
    this.chekForItems = this.chekForItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChekout = this.onChekout.bind(this);
    this.onCartClick = this.onCartClick.bind(this);
  }

  changeCurrency(currency) { this.setState({ currency }) }

  chekForItems(cart, id) { return Object.keys(cart).includes(id) }

  addToCart(item, selection, price) { this.setState({ cart: { ...this.state.cart,...{ [item]: { selection, count: 1, prices: price } } } }) }

  onAdd(productId, options) {
    let { selection, count, prices } = options;
    this.chekForItems(this.state.cart, productId) ? this.setState({ cart: { ...this.state.cart,...{ [productId]: { selection, count: count+1, prices } } } }) : this.setState({ cart: {...this.state.cart }});
  }
  onRemove(productId, options) {
    let { selection, count, prices } = options;
    this.chekForItems(this.state.cart, productId) ? this.setState({ cart: { ...this.state.cart,...{ [productId]: { selection, count: count-1, prices } } } }) : this.setState({ cart: {...this.state.cart }});
  }

  onChekout() {
    this.setState({ cart: {} })
  }

  onCartClick(isVisible) {
    this.setState({ isOverlayVisible: isVisible })
  }

  componentDidUpdate() {
    let removeItemFromCart = Object.entries(this.state.cart).filter( (i) => i[1].count === 0)
    if(removeItemFromCart.length > 0) {
      let curentState = this.state.cart
      delete curentState[removeItemFromCart[0][0]]
      this.setState({ cart: { ...curentState }})
    }

  }

  render() {
    console.log(this.state)
    return (
      <ApolloProvider client={ client }>
        <Router>
          <div className="app">
            <Navbar changeCurrency={ this.changeCurrency } currencyState={ this.state.currency } cart={ this.state.cart } onAdd={ this.onAdd } onRemove={ this.onRemove } onChekout={ this.onChekout } onCartClick={ this.onCartClick } />
            <main>
              <RouteComponent currencyState={ this.state.currency } cart={ this.state.cart } addToCart={ this.addToCart }  onAdd={ this.onAdd } onRemove={ this.onRemove } onChekout={ this.onChekout } />
            </main>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
