import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'underscore';
import { capitalize } from '../../utils/helpers';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import ContentTable from '../../components/content/ContentTable';

// Actions
import { fetchDocuments, deleteDocument } from '../../actions/collections';
import { searchByTitle } from '../../actions/utils';

// Selectors
import { filterByTitle } from '../../reducers/utils';

export class Documents extends Component {

  componentDidMount() {
    const { fetchDocuments, params } = this.props;
    fetchDocuments(params.collection_name);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchDocuments, params } = nextProps;
    if (params.collection_name !== this.props.params.collection_name) {
      fetchDocuments(params.collection_name);
    }
  }

  handleSearch(event) {
    const { searchByTitle } = this.props;
    if (event.charCode == 13) {
      searchByTitle(event.target.value);
    }
  }

  render() {
    const { isFetching, currentDocuments, deleteDocument, message, params } = this.props;
    let { collection_name } = params;

    if (isFetching) {
      return null;
    }

    let columns = ["Title", "Categories", "Tags", "Status"];
    let rows = _.map(currentDocuments, (item) => {
      return [
        item.id,
        item.meta.title,
        item.meta.categories,
        item.meta.tags,
        item.meta.status
      ];
    });
    return (
      <div>
        <div className="content-header">
          <h1>{capitalize(collection_name)}</h1>
          <div className="page-buttons">
            <Link className="btn btn-active" to={`${ADMIN_PREFIX}/collection/${collection_name}/new`}>New document</Link>
          </div>
          <strong className="message">{message}</strong>
          <div className="side-unit pull-right">
            <input
              onKeyPress={this.handleSearch.bind(this)}
              type="text"
              className="field"
              placeholder="Search by title" />
          </div>
        </div>
        <ContentTable
          contentType={collection_name}
          columns={columns}
          rows={rows}
          deleteContent={deleteDocument} />
      </div>
    );
  }
}

Documents.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  currentDocuments: PropTypes.array.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  searchByTitle: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { collections, utils } = state;
  return {
    currentDocuments: filterByTitle(collections.currentDocuments, utils.input),
    message: collections.message,
    isFetching: collections.isFetching
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDocuments,
    deleteDocument,
    searchByTitle
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Documents));
