import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import _ from 'underscore';

// Constants
import { ADMIN_PREFIX } from '../../constants';

// Components
import Splitter from '../Splitter';
import Breadcrumbs from '../Breadcrumbs';
import InputTitle from '../form/InputTitle';
import Checkbox from '../form/Checkbox';
import MarkdownEditor from '../MarkdownEditor';
import Metadata from '../../containers/MetaFields';

// Helpers
import { validateForm } from '../../utils/helpers';

export class ContentEdit extends Component {

  componentWillMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  onClickSave(id, type) {
    const { updateContent, fieldChanged } = this.props;
    if (fieldChanged) {
      updateContent(id, type);
    }
  }

  onClickDelete(id, title) {
    const { deleteContent } = this.props;
    let confirm = window.confirm(`Delete '${title}' ?`);
    if (confirm) {
      deleteContent(id);
      browserHistory.goBack();
    }
  }

  render() {
    const { contentType, content, updateContent, deleteContent, errors,
      updateTitle, updateBody, updatePath, updateDraft, updated, fieldChanged
    } = this.props;

    if (_.isEmpty(content)) {
      return <h1>{`Could not find the document.`}</h1>;
    }

    const { id, body, meta: {title, path, published, ...rest} } = content;
    const deleteLbl = contentType == 'pages' ? 'Delete page' : 'Delete document';
    const link = content.collection_name ?
      `${ADMIN_PREFIX}/collections/${content.collection_name}` : `${ADMIN_PREFIX}/pages`;
    const linkText = content.collection_name || 'Pages';
    const type = content.collection_name  ? content.collection_name : 'pages';
    const draft = published === undefined ? false : !published;

    return (
      <div>
        {
          errors.length > 0 &&
          <ul className="error-messages">
            {_.map(errors, (error,i) => <li key={i}>{error}</li>)}
          </ul>
        }

        <Breadcrumbs onChange={updatePath}
          ref="breadcrumbs"
          link={link}
          linkText={linkText}
          path={path}
          type={type} />

        <div className="content-wrapper">
          <div className="content-body">
            <InputTitle onChange={updateTitle} title={title} ref="title" />
            <MarkdownEditor
              onChange={updateBody}
              placeholder="Body"
              initialValue={body}
              ref="editor" />
            <Splitter />
            <Metadata content={content} />
          </div>

          <div className="content-side">
            <div className="side-unit">
              <a onClick={() => this.onClickSave(id, content.collection_name)}
                className={"btn"+(fieldChanged ? " btn-success " : " ")+"btn-fat"}>
                {updated ? 'Saved' : 'Save'}
              </a>
            </div>
            <div className="side-unit">
              <Link target="_blank" className="btn btn-fat" to={`/`}>View</Link>
            </div>
            <div className="side-unit">
              <Checkbox
                onChange={updateDraft}
                checked={draft}
                text="Draft"
                ref="draft" />
            </div>
            <Splitter />
            <a onClick={this.onClickDelete.bind(this, id, title)}
              className="side-link delete">
                <i className="fa fa-trash-o"></i>{deleteLbl}
            </a>
          </div>

        </div>
      </div>
    );
  }
}

ContentEdit.propTypes = {
  contentType: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
  fieldChanged: PropTypes.bool.isRequired,
  updated: PropTypes.bool.isRequired,
  updateContent: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  updateBody: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  updateDraft: PropTypes.func.isRequired,
  deleteContent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

export default ContentEdit;
