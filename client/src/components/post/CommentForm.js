import React, { Component } from 'react';

import { connect } from 'react-redux';

import { addComment } from '../../store/action/postActions';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: '',errors:{} });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const errors = this.state.errors;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Make a comment...
          </div>
          <div className="card-body">
            <form >
              <div className="form-group">
              <textarea placeholder="Comment"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                style={{width:'100%'}}
                />

                {errors.text && <div className="d-block invalid-feedback">{errors.text}</div>}
              </div>

              <button onClick={this.onSubmit} className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.post.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
