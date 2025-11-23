package com.dev.auth.auth_app_backend.services;

import com.dev.auth.auth_app_backend.dtos.UserDto;

public interface UserService {

    // create user
    UserDto createUser(UserDto userDto);

    // get user by email id
    UserDto getUserByEmail(String email);

    // update user
    UserDto updateUser(UserDto userDto, String userId);

    // delete user
    void deleteUser(String userId);

    // get user by Id
    UserDto getUserById(String id);

    // get all users
    Iterable<UserDto> getAllUsers();
}
