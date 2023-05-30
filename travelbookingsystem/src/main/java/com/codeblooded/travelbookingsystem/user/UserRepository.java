package com.codeblooded.travelbookingsystem.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Constants
    public static final String USER_ALREADY_EXISTS = "User Already Exists";
    public static final String USER_CREATED_SUCCESSFULLY = "User Created Successfully !";
    public static final String USER_UPDATED_SUCCESSFULLY = "User Updated Successfully !";
    public static final String USER_NOT_FOUND = "User Not Found";


    // Methods
    User findById(long id);

    User getUserByEmail(String email);

    User findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);

    boolean existsById(Long id);
}
