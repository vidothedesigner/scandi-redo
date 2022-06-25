import { PureComponent } from 'react';
import { graphql } from '@apollo/react-hoc';
import { Link } from 'react-router-dom';

// components
import Product from '../Product/Product';

// queries
import { getProductsByCategory } from '../../queries/queries';

class Categories extends PureComponent {
  render() {
    let { data } = this.props;
    if(data.loading) {
      return <div>Loading...</div>
    } else {
      let { products } = data.category;
      return (
        <div className="categoryContainer">
          <h1 className="categoryTitle">Category {data.category.name}</h1>
          <div className="productContainer">
            { products.map((product, i) => <Link key={ i } to={ product.id } onClick={ ()=> this.props.getProductId(product.id) }><Product product={ product.id } location={ 'inCategory' } currencyState={ this.props.currencyState } addToCart={ this.props.addToCart } /></Link>) }
          </div>
        </div>
      )
    }
  }
}

export default graphql(getProductsByCategory,{
  options:(props) => {
    return {
        variables: {
            title: props.category
        }
    }
}
})(Categories);