// Copyright (c) 2017 Intel Corporation. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const assert = require('assert');
const rclnodejs = require('../index.js');
const {message} = rclnodejs;

describe('rclnodejs publisher test suite', function() {
  before(function() {
    this.timeout(10 * 1000);
    return rclnodejs.init();
  });

  after(function() {
    rclnodejs.shutdown();
  });

  it('Try creating a publisher', function() {
    const node = rclnodejs.createNode('publisher_node');
    let String = rclnodejs.require('std_msgs').msg.String;
    const publisher = node.createPublisher(String, 'topic');
    rclnodejs.spin(node);
  });

  it('Try publish a message', function() {
    const node = rclnodejs.createNode('publisher_node');
    let String = rclnodejs.require('std_msgs').msg.String;
    const publisher = node.createPublisher(String, 'topic');
    let msg = new String();
    msg.data = 'Hello ROS 2.0 Publisher!';
    publisher.publish(msg);
    rclnodejs.spin(node);
  });
});
