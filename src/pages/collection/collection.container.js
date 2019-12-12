import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import CollectionPage from "./collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {selectIsCollectionsLoaded} from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isLoading: state => ! selectIsCollectionsLoaded(state)
});

// 2 cach la <=> nhau
// const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage));
const CollectionPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;