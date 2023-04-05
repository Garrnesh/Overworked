import Card from 'react-bootstrap/Card';
import { Button, Nav } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
// import logo from './Buyer/thriftit.logo.png';

const Home = () => {
    return (
        <React.Fragment>
            <div className="text-center mb-5 mt-3">
                <h1>Explore ThriftIt</h1>
            </div>

            <Carousel className='carousel-dark' interval ={3000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.buyandship.com.my/contents/uploads/2020/08/preowned-store-blank.png"
                        alt="First slide"
                        style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "contain"
                        }}
                    />
                    <Carousel.Caption>
                        <h3 className="text-light">ThriftIt Trends</h3>
                        <p className="text-light">Explore what others are wearing and be like them!</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://youthopia.sg/wp-content/uploads/2021/06/social-media-vintagewknd.png"
                        alt="Second slide"
                        style={{
                            width: "400px",
                            height: "400px",
                            objectFit: "contain"
                        }}
                    />
                    <Carousel.Caption>
                        <h3 className="text-light">ThriftIt Shops</h3>
                        <p className="text-light"> Explore popular thrift stores in Singapore</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://media.timeout.com/images/105596806/750/422/image.jpg"
                        alt="Third slide"
                        style={{
                            width: "100%",
                            height: "400px",
                            objectFit: "contain"
                        }}
                    />
                    <Carousel.Caption>
                        <h3 className="text-light">Sustainability</h3>
                        <p className="text-light">ThriftIt is a sustainble company</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="text-center mt-5">
                
            </div>

        </React.Fragment>
    );
}

export default Home;