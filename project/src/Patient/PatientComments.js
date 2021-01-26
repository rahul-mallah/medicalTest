import React, { Component } from 'react'
import {withRouter, Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import './comment.css'

class PatientComments extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';
    

    if (this.state.showComments) {
      buttonText = 'Hide Comments';
      commentNodes = /*#__PURE__*/React.createElement("div", { className: "comment-list" }, comments);
    }

    return /*#__PURE__*/(
      

      React.createElement("div", { className: "comment-box" }, /*#__PURE__*/
      React.createElement("h2", null, "Join the Discussion!"), /*#__PURE__*/
      React.createElement(CommentForm, { addComment: this._addComment.bind(this) }), /*#__PURE__*/
      React.createElement("button", { id: "comment-reveal", onClick: this._handleClick.bind(this) },
      buttonText), /*#__PURE__*/

      React.createElement("h3", null, "Comments"), /*#__PURE__*/
      React.createElement("h4", { className: "comment-count" },
      this._getCommentsTitle(comments.length)),

      commentNodes) 

      
      );
  } // end render

  _addComment(author, body) {

    const comment = {
      id: this.state.comments.length + 1,
      author,
      body,
      email: this.props.email
     };

    
    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    
    
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments });
  }

  _getComments() {
    return this.state.comments.map(comment => {
      return /*#__PURE__*/(
        React.createElement(Comment, {
          author: comment.author,
          body: comment.body,
          key: comment.id }));
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }}
// end CommentBox component

class CommentForm extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("form", { className: "comment-form", onSubmit: this._handleSubmit.bind(this) }, /*#__PURE__*/
      React.createElement("div", { className: "comment-form-fields" }, /*#__PURE__*/
      React.createElement("input", { placeholder: "Name", required: true, ref: input => this._author = input }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("textarea", { placeholder: "Comment", rows: "4", required: true, ref: textarea => this._body = textarea })), /*#__PURE__*/

      React.createElement("div", { className: "comment-form-actions" }, /*#__PURE__*/
      React.createElement("button", { type: "submit" }, "Post Comment"))));
  } // end render

  _handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  }}
// end CommentForm component

class Comment extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "comment" }, /*#__PURE__*/
      React.createElement("p", { className: "comment-header" }, this.props.author), /*#__PURE__*/
      React.createElement("p", { className: "comment-body" }, "- ", this.props.body), /*#__PURE__*/
      React.createElement("div", { className: "comment-footer" }, /*#__PURE__*/
      React.createElement("a", { href: "#", className: "comment-footer-delete", onClick: this._deleteComment }, "Delete Comment"))));
  }
  _deleteComment() {
    alert();
  }}

// ReactDOM.render( /*#__PURE__*/React.createElement(ViewMyMPUI, null), document.getElementById('main'));

export default PatientComments