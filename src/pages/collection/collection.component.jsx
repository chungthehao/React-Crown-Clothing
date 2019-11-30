import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectShopCollection } from '../../redux/shop/shop.selector';
import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  console.log(collection);
  return (
    <div className='collection-page'>
      <h2>COLLECTION PAGE</h2>
    </div>
  );
};

// ownProps gives us all of the props that we're getting on our CollectionPage component (bao gồm match obj mà mình có đc trực tiếp từ Route component)
const mapStateToProps = (state, ownProps) => ({
  // - selectShopCollection(ownProps.match.params.collectionId) trả về createSelector call
  // - Khi createSelector đc gọi trả về 1 function nhận tham số là state rồi đi tiếp selector flow như thường lệ (truyền state vô để wire everything together)
  collection: selectShopCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
