package org.hms.Guard.repository;

import org.hms.Guard.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Object> {
    Optional<User> findByEmail(String email);
    String deleteByEmail(String email);

}
