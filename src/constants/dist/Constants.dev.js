"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DELETE_POST = exports.GET_FOLLOWING = exports.GET_FOLLOWERS = exports.GET_MY_POSTS = exports.NEW_POST = exports.TOGGLE_LIKE = exports.POPULATE_FEED = exports.REGISTER_MUTATION = exports.LOGIN_MUTATION = exports.GRAPHQL_API = void 0;

var _apolloBoost = require("apollo-boost");

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  mutation deletePost($postId: ID) {\n    status: deletePost(postId: $postId) {\n      message\n      success\n    }\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  {\n    account: getAccount {\n      following {\n        id\n        name\n        surname\n      }\n    }\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  {\n    account: getAccount {\n      followers {\n        id\n        name\n        surname\n      }\n    }\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  {\n    account: getAccount {\n      posts {\n        id\n        title\n        body\n        dateTimePosted\n        numberOfLikes\n        likedByTheCurrentUser\n      }\n    }\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  mutation addPost($post: PostInput) {\n    post: addPost(post: $post) {\n      id\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  mutation toggleLike($postId: ID) {\n    post: toggleLike(postId: $postId) {\n      numberOfLikes\n    }\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  {\n    posts: populateFeed(offsetDays: 0, numberOfDays: 100) {\n      id\n      title\n      body\n      dateTimePosted\n      author {\n        id\n        name\n        surname\n        user {\n          username\n        }\n      }\n      numberOfLikes\n      likedByTheCurrentUser\n    }\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  mutation createAccount($account: AccountInput) {\n    account: createAccount(account: $account) {\n      token\n      account {\n        id\n        name\n        surname\n        bio\n        numberOfFollowers\n        numberOfFollowing\n        user {\n          username\n          email\n        }\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  mutation signIn($authData: AuthData) {\n    signIn(authData: $authData) {\n      token\n      account {\n        id\n        name\n        surname\n        bio\n        numberOfFollowers\n        numberOfFollowing\n        user {\n          username\n          email\n        }\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GRAPHQL_API = "http://localhost:8080/graphql";
exports.GRAPHQL_API = GRAPHQL_API;
var LOGIN_MUTATION = (0, _apolloBoost.gql)(_templateObject());
exports.LOGIN_MUTATION = LOGIN_MUTATION;
var REGISTER_MUTATION = (0, _apolloBoost.gql)(_templateObject2());
exports.REGISTER_MUTATION = REGISTER_MUTATION;
var POPULATE_FEED = (0, _apolloBoost.gql)(_templateObject3());
exports.POPULATE_FEED = POPULATE_FEED;
var TOGGLE_LIKE = (0, _apolloBoost.gql)(_templateObject4());
exports.TOGGLE_LIKE = TOGGLE_LIKE;
var NEW_POST = (0, _apolloBoost.gql)(_templateObject5());
exports.NEW_POST = NEW_POST;
var GET_MY_POSTS = (0, _apolloBoost.gql)(_templateObject6());
exports.GET_MY_POSTS = GET_MY_POSTS;
var GET_FOLLOWERS = (0, _apolloBoost.gql)(_templateObject7());
exports.GET_FOLLOWERS = GET_FOLLOWERS;
var GET_FOLLOWING = (0, _apolloBoost.gql)(_templateObject8());
exports.GET_FOLLOWING = GET_FOLLOWING;
var DELETE_POST = (0, _apolloBoost.gql)(_templateObject9());
exports.DELETE_POST = DELETE_POST;