import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from "react-redux";

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {updateCollections} from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {
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
        });
    }

    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
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
