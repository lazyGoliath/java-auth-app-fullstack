package com.dev.auth.auth_app_backend.entities;

import com.dev.auth.auth_app_backend.entities.Provider;
import com.dev.auth.auth_app_backend.entities.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name="users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID id;
    @Column(name = "user_email", unique = true, length = 300)
    private String email;
    private String password;
    @Column(name = "user_name", length = 500)
    private String name;
    private String image;
    private boolean enable = true;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
//    private String gender;
//    private Address address;

    // provider can be Google, GitHub,etc. OAuth
    @Enumerated(EnumType.STRING)
    private Provider provider = Provider.LOCAL;
    private String providerId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    // automatically invoked when creating a new entity
    // part of hibernate entity lifecycle
    @PrePersist
    protected void prePersist(){
        Instant now = Instant.now();
        if(createdAt==null){
            createdAt = now;
        }
        updatedAt = now;
    }

    @PreUpdate
    protected void preUpdate(){
        updatedAt = Instant.now();
    }

    // implement UserDetails interface functions
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .toList();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        //return UserDetails.super.isAccountNonExpired();
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        //return UserDetails.super.isAccountNonLocked();
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        //return UserDetails.super.isCredentialsNonExpired();
        return true;
    }

    @Override
    public boolean isEnabled() {
        //return UserDetails.super.isEnabled();
        return this.enable;
    }
}