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

/** Class representing a Subscription in ROS */
class Subscription {
  constructor(handle, nodeHandle, typeClass, topic, callback) {
    this._handle = handle;
    this._nodeHandle = nodeHandle;
    this._topic = topic;
    this._callback = callback;
    this._typeClass = typeClass;
    this._rosMsg = new typeClass();
  }

  get handle() {
    return this._handle;
  }

  get takenMsg() {
    return this._rosMsg.toRawROS();
  }

  processResponse() {
    this._callback(this._rosMsg);
  }

  static createSubscription(nodeHandle, typeClass, topic, callback) {
    let type = typeClass.type();
    let handle = rclnodejs.createSubscription(nodeHandle, type.pkgName, type.subFolder, type.interfaceName, topic);
    return new Subscription(handle, nodeHandle, typeClass, topic, callback);
  }
};

module.exports = Subscription;
