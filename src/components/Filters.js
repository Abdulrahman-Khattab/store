import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const { filters, updateFilters, clearFilters, allProducts } =
    useFilterContext();

  const {
    text,
    category,
    company,
    colors,
    max_Price,
    min_Price,
    price,
    shipping,
  } = filters;

  const uniqueCategory = getUniqueValues(allProducts, 'category');
  const uniqueColors = getUniqueValues(allProducts, 'colors');
  const uniqueCompanies = getUniqueValues(allProducts, 'company');

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input*/}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              className='search-input'
              placeholder='search'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/*End of search input*/}
          {/*Start Category*/}
          <div>
            <h5>Category</h5>
            <div className='form-control'>
              {uniqueCategory.map((c) => {
                return (
                  <button
                    type='button'
                    onClick={updateFilters}
                    name='category'
                    className={`${c === category ? 'active' : null}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/*End Category*/}
          {/*Start of companies*/}
          <div className='form-control'>
            <h5>companies</h5>
            <select
              name='company'
              value={company}
              onChange={updateFilters}
              className='company'
            >
              {uniqueCompanies.map((item) => {
                return <option value={`${item}`}>{item}</option>;
              })}
            </select>
          </div>
          {/*End of companies*/}
          {/*Start of colors*/}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {uniqueColors.map((item) => {
                if (item === 'all') {
                  return (
                    <button
                      name='colors'
                      className={`${
                        colors === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                      onClick={updateFilters}
                      data-color='all'
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    className='color-btn'
                    name='colors'
                    onClick={updateFilters}
                    data-color={item}
                    style={{ background: item }}
                  >
                    {' '}
                    {item === colors ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/*End of colors*/}
          {/*start of price*/}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              max={max_Price}
              min={min_Price}
              value={price}
              name='price'
              onChange={updateFilters}
            />
          </div>
          {/*End of price*/}
          {/*start of shipping*/}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
          {/*End of shipping*/}
        </form>
        <button type='button' className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
