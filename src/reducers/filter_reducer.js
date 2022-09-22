import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, price: maxPrice, max_Price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, gird_View: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, gird_View: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [...filteredProducts];

    if (sort === 'price-lowest') {
      tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === 'name-z') {
      tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }

    return { ...state, filteredProducts: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const name = action.payload.name;
    const value = action.payload.value;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const {
      text,
      category,
      company,
      colors,
      max_Price,
      min_Price,
      price,
      shipping,
    } = state.filters;

    let tempProducts = [...allProducts];
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }

    // Category

    if (category) {
      tempProducts = tempProducts.filter((products) => {
        if (category === 'all') {
          return products;
        }

        return products.category === category;
      });
    }

    // Company

    if (company) {
      tempProducts = tempProducts.filter((products) => {
        if (company === 'all') {
          return products;
        }

        return products.company === company;
      });
    }

    // Colors
    if (colors) {
      tempProducts = tempProducts.filter((products) => {
        if (colors === 'all') {
          return products;
        }

        return products.colors.find((c) => c === colors);
      });
    }

    // shipping

    if (shipping) {
      tempProducts = tempProducts.filter((products) => {
        return products.shipping === true;
      });
    }

    // price
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    });

    return { ...state, filteredProducts: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        company: 'all',
        colors: 'all',
        price: state.filters.max_Price,

        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
