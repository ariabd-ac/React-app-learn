import React, { Component, Fragment } from "react";
import "./BlogPost.css";
import Post from "../../component/Post/Post";

import axios from "axios";

// const axios = require("axios");

class BlogPost extends Component {
  state = {
    post: [],
    formBlogPost: {
      id: 1,
      title: "aw",
      body: "aw",
      userId: 1,
    },
  };

  handleRemove = (data) => {
    console.log(data);
    axios.delete(`http://localhost:3004/posts/${data}`).then((res) => {
      this.getPostAPI();
    });
  };

  getPostAPI = () => {
    axios.get("http://localhost:3004/posts").then((res) => {
      console.log(res.data);
      this.setState({
        post: res.data,
      });
    });
  };

  handleFormChange = (event) => {
    // console.log("formChange", event.target);
    let formBlogPostNew = { ...this.state.formBlogPost };
    let timestamp = new Date().getTime();
    formBlogPostNew["id"] = timestamp;
    formBlogPostNew[event.target.name] = event.target.value;
    this.setState(
      {
        formBlogPost: formBlogPostNew,
      },
      () => {
        console.log("value obj formBlogPost: ", this.state.formBlogPost);
      }
    );
  };

  handleSubmit = () => {
    console.log(this.state.formBlogPost);
  };

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     this.setState({
    //       post: json,
    //     });
    // //   });
    // axios.get("http://localhost:3000/posts").then((res) => {
    //   console.log(res.data);
    //   this.setState({
    //     post: res.data,
    //   });
    // });
    this.getPostAPI();
  }

  render() {
    return (
      <Fragment>
        <p className="section-title">BlogPost!</p>
        <div className="col-md-12 mb-3">
          <div className="form-add-post">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="add title"
              onChange={this.handleFormChange}
            />
            <label htmlFor="body">Body</label>
            <textarea
              className="body"
              placeholder="add body content"
              id="body"
              name="body"
              cols="30"
              rows="10"
              onChange={this.handleFormChange}
            />
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Simpan
            </button>
          </div>
        </div>
        {this.state.post.map((post) => {
          return <Post key={post.id} data={post} remove={this.handleRemove} />;
        })}
      </Fragment>
    );
  }
}

export default BlogPost;
