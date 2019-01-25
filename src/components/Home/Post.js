import React, { Component } from "react";
import { Divider } from "@shoutem/ui";

import Card from "../common/Card";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";

export class Post extends Component {
  render() {
    return (
      <Card>
        <PostHeader />
        <Divider styleName="line" />
        <PostContent />
        <Divider styleName="line" />
        <PostFooter />
      </Card>
    );
  }
}

export default Post;
