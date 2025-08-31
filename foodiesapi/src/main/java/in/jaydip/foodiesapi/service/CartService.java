package in.jaydip.foodiesapi.service;

import in.jaydip.foodiesapi.io.CartRequest;
import in.jaydip.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
