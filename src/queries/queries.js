import { gql } from "@apollo/client";

const getCategoriesQuery = gql`
{
    categories{
        name
    }
}
`
const getProductsByCategory = gql`
query($title:String!){
  category(input:{ title: $title } ){
    name
    products{
      id
      name
      inStock
      gallery
      description
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
				currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`
const singleProduct = gql`
query($id:String!){
  product(id:$id){
    id
    name
    inStock
    gallery
    description
    category
    attributes{
      id
      name
      type
      items{
        displayValue
        value
        id
      }
    }
    prices{
      currency{
        label
        symbol
      }
      amount
    }
    brand
  }
}
`
const currencies = gql`
{
  currencies{
    label
    symbol
  }
}
`

export {
    getCategoriesQuery,
    getProductsByCategory,
    singleProduct,
    currencies
}