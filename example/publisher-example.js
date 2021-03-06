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

// Usage: lanuch ./install/bin/examples_rclcpp_minimal_subscriber_lambda
//  to display the message published by this program

'use strict';

const rclnodejs = require('../index.js');

rclnodejs.init().then(() => {
  const node = rclnodejs.createNode('publisher_example_node');

  /* eslint-disable */
  let String = rclnodejs.require('std_msgs').msg.String;
  const publisher = node.createPublisher(String, 'topic');
  let msg = new String();
  /* eslint-enable */

  let counter = 0;
  setInterval(function() {
    const str = 'Hello ROS ' + counter++;
    console.log('Publishing message:', str);

    msg.data = str;
    publisher.publish(msg);
  }, 10);

  rclnodejs.spin(node);
});
