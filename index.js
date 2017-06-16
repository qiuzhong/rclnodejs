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

const rclnodejs = require('bindings')('rclnodejs');
const Node = require('./lib/node.js');
const generator = require('./rosidl_gen/generator.js');

function inherits(target, source) {
  let properties = Object.getOwnPropertyNames(source.prototype);
  properties.forEach((property) => {
    target.prototype[property] = source.prototype[property];
  });
}

inherits(rclnodejs.ShadowNode, Node);

let rcl = {
  _nodes: [],

  createNode(nodeName, namespace = '') {
    let handle = rclnodejs.createNode(nodeName, namespace);

    let node =  new rclnodejs.ShadowNode();
    node.init();
    node._handle = handle;

    this._nodes.push(node);

    return node;
  },

  init(...args) {
    rclnodejs.init(args);

    // TODO(Kenny): introduce other policy to save the amout of time of doing message generation
    return new Promise(function(resolve, reject) {
      this.message.generateAll().then(() => {
        resolve();
      }).catch((e) => {
        reject(e);
      });
    }.bind(this));
  },

  spin(node) {
    if (node.spinning) {
      throw new Error('The node is already spinning.');
    }

    rclnodejs.spin(node);
    node.spinning = true;
  },

  shutdown() {
    this._nodes.forEach((node) => {
      rclnodejs.shutdown(node);
    });
    this._nodes = [];
  },

  message: generator,
};

module.exports = rcl;