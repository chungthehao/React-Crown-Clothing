import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from "react-redux";

import {fetchCollectionsStart} from "../../redux/shop/shop.actions";
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container.jsx';
import CollectionPageContainer from '../collection/collection.container.jsx';


class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();

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
    const { match } = this.props;

    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`}
               component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`}
               component={CollectionPageContainer} />
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
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
