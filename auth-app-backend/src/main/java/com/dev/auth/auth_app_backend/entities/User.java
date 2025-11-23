package com.dev.auth.auth_app_backend.entities;

import com.dev.auth.auth_app_backend.entities.Provider;
import com.dev.auth.auth_app_backend.entities.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name="users")
public class User{

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
}