import {connect} from 'react-redux';
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import CollectionsOverview from "./collections-overview.component";
import WithSpinner from "../with-spinner/with-spinner.component";
import {selectIsCollectionFetching} from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
});

// 2 CACH VIET <=> NHAU
// const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner,
)(CollectionsOverview);

export default CollectionOverviewContainer;