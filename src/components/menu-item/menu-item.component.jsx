import React from 'react';
import { withRouter } from 'react-router-dom'; // higher order component: component -> modified component (có thể access history, location, match ở props)

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <div
    className={size + ' menu-item'}
    onClick={() => history.push(match.url + linkUrl)}
  >
    <div
      className='background-image'
      style={{ backgroundImage: `url(${imageUrl})` }}
    />

    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
