import { PureComponent } from 'react';
import { graphql } from '@apollo/react-hoc';

// components
import Product from '../Product/Product';

// queries
import { singleProduct } from '../../queries/queries';

class Single extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      productId: ''
    }
  }

componentDidMount() {
  this.state.productId === '' ? this.setState({ productId: this.props.productId }) : this.setState({ productId:`${window.location.pathname.match(/(\w*([a-zA-Z0-9]-)\w*){1,10}$/gi)}` })
}
componentDidUpdate() {
  this.setState({ productId: this.props.productId })
}

  render() {
    return ( <div className="singleProductContainer"><Product product={ this.props.productId || this.state.productId } location={ "inSingle" } currencyState={ this.props.currencyState } addToCart={ this.props.addToCart } /></div> )
  }
}

export default graphql(singleProduct,{
  options:(props) => {
    return {
        variables: {
            id: props.productId
        }
    }
}
})(Single);
