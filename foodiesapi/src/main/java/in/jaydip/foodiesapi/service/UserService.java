package in.jaydip.foodiesapi.service;

import in.jaydip.foodiesapi.io.UserRequest;
import in.jaydip.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
