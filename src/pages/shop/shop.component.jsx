import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from "react-redux";

import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview); // Chinh la Spinner; // trả về 1 component
const CollectionPageWithSpinner = WithSpinner(CollectionPage); // Chinh la Spinner; // trả về 1 component

class ShopPage extends React.Component {
  // Short hand to have state
  // React tự chạy constructor & super này nọ (các phiên bản React sau này mới có)
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;

    const collectionRef = firestore.collection('collections');

    // onSnapshot: whenever the 'collectionRef' updates or whenever this code gets run for the 1st time
    // this 'collectionRef' will send us the snapshot representing the code of our collections objects array at the time when this code renders.
    collectionRef.onSnapshot(async snapshot => {
      // console.log(snapshot); // Là nguyên 1 collection snapshot có tên là 'collections' từ Firebase

      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // console.log(collectionsMap);

      // Cập nhật vô redux -> shop -> collections
      updateCollections(collectionsMap);

      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div className='shop-page'>
        {/*<Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />*/}


        <Route exact path={`${match.path}`}
               render={props => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`}
               render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />} />

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

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
