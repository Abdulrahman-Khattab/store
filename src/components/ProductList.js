import React from 'react';
import { GiRabbit } from 'react-icons/gi';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filteredProducts, gird_View } = useFilterContext();

  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        sorry , there is nothing match your search
      </h5>
    );
  }

  if (gird_View) {
    return <GridView products={filteredProducts}></GridView>;
  }
  return <ListView products={filteredProducts}></ListView>;
};

export default ProductList;
