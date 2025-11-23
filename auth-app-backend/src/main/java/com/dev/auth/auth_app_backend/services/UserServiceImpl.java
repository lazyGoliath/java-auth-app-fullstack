package com.dev.auth.auth_app_backend.services;

import com.dev.auth.auth_app_backend.dtos.UserDto;
import com.dev.auth.auth_app_backend.entities.Provider;
import com.dev.auth.auth_app_backend.entities.User;
import com.dev.auth.auth_app_backend.exceptions.ResourceNotFoundException;
import com.dev.auth.auth_app_backend.helper.UserHelper;
import com.dev.auth.auth_app_backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional  // will not create new user if code fails
    public UserDto createUser(UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isBlank()){
            throw new IllegalArgumentException("Email is required");
        }

        // check for duplicate emails
        if(userRepository.existsByEmail(userDto.getEmail())){
            throw new IllegalArgumentException("User with given email already exists");
        }

        // convert user dto into user entity
        // either create custom functions or use Model mapper library
        User user = modelMapper.map(userDto, User.class);

        // check for null provider
        user.setProvider(userDto.getProvider()!=null?userDto.getProvider():Provider.LOCAL);

        // TODO : Assign role here to user__ for authentication

        // save the new user
        User savedUser = userRepository.save(user);

        // convert user entity to dto and send to next Layer
        return modelMapper.map(savedUser, UserDto.class);

    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(()->new ResourceNotFoundException("User not found with given email id"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {

        // retrieve old user
        User old_user = userRepository
                .findById(UserHelper.parseUUID(userId))
                .orElseThrow(()->new ResourceNotFoundException("User not found with given user id"));

        // make changes and get new user
        if(userDto.getName() != null) old_user.setName(userDto.getName());
        if(userDto.getImage() != null) old_user.setImage(userDto.getImage());
        if(userDto.getProvider() != null) old_user.setProvider(userDto.getProvider());
        // TODO : Change password updation logic...(add Hashing)
        if(userDto.getPassword() != null) old_user.setPassword(userDto.getPassword());
        old_user.setEnable(userDto.isEnable());
        // update timestamp
        old_user.setUpdatedAt(Instant.now());

        // save the changes - repo connected to DB
        User new_user = userRepository.save(old_user);

        // update and return dto
        return modelMapper.map(new_user, UserDto.class);
    }

    @Override
    public void deleteUser(String userId) {

        UUID uid = UserHelper.parseUUID(userId);
        User user = userRepository
                .findById(uid)
                .orElseThrow(()->new ResourceNotFoundException("User not found with given user id"));

        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String id) {

        User user = userRepository
                .findById(UserHelper.parseUUID(id))
                .orElseThrow(()-> new ResourceNotFoundException("User not found with given user id"));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public Iterable<UserDto> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .toList();
    }
}