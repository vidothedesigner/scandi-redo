import { PureComponent } from 'react';
import { graphql } from '@apollo/react-hoc';
import DOMPurify from 'dompurify';
import CartWhite from '../../images/CartWhite.svg';


// components
import Gallery from '../Gallery/Gallery';
import Attributes from '../Attributes/Attributes';
import Prices from '../Prices/Prices';

//queries
import { singleProduct } from '../../queries/queries';

class Product extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {}

        this.displayProduct = this.displayProduct.bind(this);
        this.getSelectedItems = this.getSelectedItems.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleSingleAddToCart = this.handleSingleAddToCart.bind(this);
    }

    getSelectedItems(type,selection) { this.setState({ ...this.state, [type]: selection }) }
    
    handleAddToCart(e) {
        e.preventDefault();
        let product = this.props.data.product;
        let selection = {};
        product.attributes.forEach(att => selection = { ...selection,[att.id] : att.items[0].value })
        this.props.addToCart(product.id, selection, product.prices)
    }

    handleSingleAddToCart() {
        const product = this.props.data.product;
        let selection = {};
        product.attributes.forEach(att => selection = { ...selection,[att.id] : att.items[0].value })

        if(!product.attributes.length) {
            return product.inStock && <button className="btn btn-green" onClick={ () => this.props.addToCart(product.id, this.state, product.prices) }>Add to Cart</button>
        } else {
            return product.inStock && <button className="btn btn-green" onClick={ () => this.props.addToCart(product.id, !Object.keys(this.state).length ? selection : this.state, product.prices) }>Add to Cart</button>
        }
        // return (<h1>This is me</h1>)
    }

    displayProduct(location) {
        let product = this.props.data.product;
        let prices = product && product.prices.filter( price => price.currency.label === this.props.currencyState.label );
        switch(location) {
            case 'inCategory':
            return ( 
                <div key={ product.id } className={`productCard${ !product.inStock ? ' noStock' : ''}`}>
                    <div className="imgContainer">
                        <img src={ product.gallery[0] } alt={ `${product.name}` } />
                    </div>
                    <div className="buttonContainer">
                        { product.inStock && <button className="circle-button" onClick={ this.handleAddToCart }><img src={ CartWhite } alt="Company Logo" /></button>}
                    </div>
                    <h2 className="productName">{ product.name }</h2>
                    { prices && <Prices prices={ prices } location={ 'inCategory' } /> }
                </div>
            );
            case 'inSingle':
                // OVDE RABOTAM ALOOO
                // ALOOOOOOO
                console.log(product.attributes.length)
            return(
                <>
                    <Gallery productGallery={ product.gallery } />
                    <div className="productDiscription">
                        <h1>{ product.brand }</h1>
                        <h2>{ product.name }</h2>
                        <Attributes productAttributes={ product.attributes } getSelectedItems={ this.getSelectedItems } />
                        { prices && <Prices prices={ prices } location={ location } /> }
                        <div className="buttonContainer">
                            { this.handleSingleAddToCart() }
                        </div>
                        { product.description ? <div className="description" dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(product.description) } }></div> : "" }
                    </div>
                </>
            );
            case 'inCart':
                let isBag = this.props.isBag;
            return (
                <div className={ isBag ? "bagProduct" : "cartProduct" }>
                    <div className="cartProductSelection">
                        <h2 className="cartProductHeading">{ product.brand }</h2>
                        <h3 className="cartProductHeading">{ product.name }</h3>
                        <Prices prices={ prices } isBag={ isBag } />
                        <Attributes productAttributes={ product.attributes } preSelection={ this.props.itemValues.selection } location={ location } isBag={ isBag } />
                    </div>
                    <div className="cartProductCount">
                        <button onClick={ () => { this.props.onAdd(product.id, this.props.itemValues ) } }>+</button>
                        <div className="count"><span>{ this.props.itemValues.count }</span></div>
                        <button onClick={ () => { this.props.onRemove(product.id, this.props.itemValues) } }>-</button>
                    </div>
                    <Gallery productGallery={ product.gallery } location={ location } isBag={ isBag } />
                </div>
            );
            default:
                console.log('default');
                console.log(this.props);

                return( <div>Loading...</div> )
        }
    }

    render() {
        let { data } = this.props;
        if(data.loading) {
            return <div>Loading...</div>
        } else {
            return  this.displayProduct(this.props.location)
        }
    }
}

export default graphql(singleProduct,{
    options:(props) => {
      return {
          variables: {
              id: props.product
          }
      }
  }
  })(Product);