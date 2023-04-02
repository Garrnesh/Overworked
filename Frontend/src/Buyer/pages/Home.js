import Card from 'react-bootstrap/Card';
import { Button, Nav } from "react-bootstrap";
import React, { useState, useEffect } from "react";
const Home = () => {
    return (
        <React.Fragment>
            <div className="text-center mb-2 mt-2">
                <h1>Explore ThriftIt</h1>
            </div>


            <div class="pb-4 container">
                <center>
                    <div class="card" >
                        <img class="card-img-top" src="https://hips.hearstapps.com/hmg-prod/images/spring-2022-trends-1642786776.jpg?resize=1200:*"/>
                            <div class="card-img-overlay card-inverse">
                                <h4 class="text-stroke text-white text-center">Check out latest fashion styles</h4>
                                <button type="button" class="btn btn-light">Check it out</button>

                            </div>
                    </div>
                </center>
            </div>
            <div class="pb-4 container">
                <center>
                    <div class="card" >
                        <img class="card-img-top" src="https://hips.hearstapps.com/hmg-prod/images/spring-2022-trends-1642786776.jpg?resize=1200:*"/>
                            <div class="card-img-overlay card-inverse">
                                <h4 class="text-stroke text-white text-center">Check out latest fashion styles</h4>
                                <button type="button" class="btn btn-light">Check it out</button>

                            </div>
                    </div>
                </center>
            </div>
            <div class="pb-4 container">
                <center>
                    <div class="card" >
                        <img class="card-img-top" src="https://hips.hearstapps.com/hmg-prod/images/spring-2022-trends-1642786776.jpg?resize=1200:*"/>
                            <div class="card-img-overlay card-inverse">
                                <h4 class="text-stroke text-white text-center">Check out latest fashion styles</h4>
                                <button type="button" class="btn btn-light">Check it out</button>

                            </div>
                    </div>
                </center>
            </div>
        </React.Fragment>
    );
}

export default Home;