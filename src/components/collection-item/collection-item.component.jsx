import React from 'react';

import CustomButtom from '../custom-button/custom-button.component';
import './collection-item.styles.scss';

const CollectionItem = ({ id, name, price, imageUrl }) => (
  <div className='collection-item'>
    <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />

    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
    </div>

    <CustomButtom inverted>Add to cart</CustomButtom>
  </div>
);

export default CollectionItem;
