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
// to display the message published by this program

'use strict';

const rclnodejs = require('../index.js');

rclnodejs.init().then(() => {
  let node = rclnodejs.createNode('subscription_example_node');

  /* eslint-disable */
  let String = rclnodejs.require('std_msgs').msg.String;

  node.createSubscription(String, 'topic', (msg) => {
    console.log(`Receive message: ${msg.data}`);
  });
  /* eslint-enable */

  rclnodejs.spin(node);
});
