package com.example.controller;

import com.example.app.controller.GreetingApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.Optional;

@RequestMapping("/greetings")
public class GreetingController implements GreetingApi {


    private final NativeWebRequest request;
    @Autowired
    public GreetingController(NativeWebRequest request) {
    this.request = request;
}

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return Optional.ofNullable(request);
    }

}
