import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selector";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); // Chinh la Spinner; // trả về 1 component
const CollectionPageWithSpinner = WithSpinner(CollectionPage); // Chinh la Spinner; // trả về 1 component

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    // # Nested too much!
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-7c56e/databases/(default)/documents/collections')
    //   .then(res => res.json())
    //   .then(myData => console.log(myData.documents))

    // # Chỉ chạy 1 lần rồi thôi!
    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //
    //   // Cập nhật vô redux -> shop -> collections
    //   updateCollections(collectionsMap);
    //
    //   this.setState({ loading: false });
    // });

    // # Subscribe
    // onSnapshot: whenever the 'collectionRef' updates or whenever this code gets run for the 1st time
    // this 'collectionRef' will send us the snapshot representing the code of our collections objects array at the time when this code renders.
    /*collectionRef.onSnapshot(async snapshot => {
      // console.log(snapshot); // Là nguyên 1 collection snapshot có tên là 'collections' từ Firebase

      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // console.log(collectionsMap);

      // Cập nhật vô redux -> shop -> collections
      updateCollections(collectionsMap);

      this.setState({ loading: false });
    });*/
  }

  render() {
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;

    return (
      <div className='shop-page'>
        {/*<Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />*/}


        <Route exact path={`${match.path}`}
               render={props => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
        <Route path={`${match.path}/:collectionId`}
               render={props => <CollectionPageWithSpinner isLoading={ ! isCollectionsLoaded} {...props} />} />

      </div>
    );
  }

}

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

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
