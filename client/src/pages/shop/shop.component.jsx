import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from "../../components/spinner/spinner.component";
// import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container.jsx';
// import CollectionPageContainer from '../collection/collection.container.jsx';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container.jsx'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container.jsx'));

const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner/>}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

// Ở App.js: <Route path='/shop' component={ShopPage} />
// const ShopPage = ({ match }) => {
//   //console.log(match);
//   return (
//     <div className='shop-page'>
//       <Route exact path={`${match.path}`} component={CollectionsOverview} />
//       <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//     </div>
//   );
// };

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
