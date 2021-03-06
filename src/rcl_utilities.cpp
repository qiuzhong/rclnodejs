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

#include "rcl_utilities.hpp"

#include <dlfcn.h>
#include <rcl/rcl.h>
#include <string>

namespace rclnodejs {

typedef const rosidl_message_type_support_t* (*GetMessageTypeSupportFunction)();
typedef const rosidl_service_type_support_t* (*GetServiceTypeSupportFunction)();

void* GetTypeSupportFunctionByInterfaceSymbolName(
    const std::string& symbol_name,
    const std::string& lib_name) {
  // TODO(Kenny): support *.dll/etc. on other platforms.
  void* lib = dlopen(lib_name.c_str(), RTLD_NOW | RTLD_GLOBAL);

  if (lib)
    return dlsym(lib, symbol_name.c_str());
  else
    return nullptr;
}

const rosidl_message_type_support_t* GetMessageTypeSupport(
    const std::string& package_name,
    const std::string& sub_folder,
    const std::string& msg_name) {
  void* function = GetTypeSupportFunctionByInterfaceSymbolName(
      "rosidl_typesupport_c__get_message_type_support_handle__" + package_name +
          "__" + sub_folder + "__" + msg_name,
      "lib" + package_name + "__rosidl_typesupport_c.so");
  if (function)
    return reinterpret_cast<GetMessageTypeSupportFunction>(function)();
  else
    return nullptr;
}

const rosidl_service_type_support_t* GetServiceTypeSupport(
    const std::string& package_name,
    const std::string& service_name) {
  void* function = GetTypeSupportFunctionByInterfaceSymbolName(
      "rosidl_typesupport_c__get_service_type_support_handle__" + package_name +
          "__srv__" + service_name,
      "lib" + package_name + "__rosidl_typesupport_c.so");
  if (function)
    return reinterpret_cast<GetServiceTypeSupportFunction>(function)();
  else
    return nullptr;
}

}  // namespace rclnodejs
