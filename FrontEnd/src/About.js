import React from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import "./About.css";

const About = () => {
    return (
        <div>
            <Card id="aboutCard">
                <CardBody>
                    <CardTitle tag="h5">ABOUT THIS SITE</CardTitle>
                    <CardSubtitle
                        id="titleText"
                        tag="h6"
                        className="mb-2 text-muted"
                    >
                        Dijkstra's Algorithm Simulator
                    </CardSubtitle>
                    <CardText>
                        <em>
                            This site finds the shortest path between two
                            points.
                        </em>
                    </CardText>
                    <CardText>
                        <b>How it was Built:</b> I used a React frontend,
                        Node/Express backend. UI elements are saved using Redux.
                        The backend works with a Postgres database to get data
                        from the user and template tables.
                    </CardText>
                    <CardText>
                        <b>Functionality:</b> Create your own maze, or choose
                        from the available templates. Login to save your
                        template to the database so others can use it.
                    </CardText>
                    <CardText>
                        Thanks for checking out my work. I appreciate the time.
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default About;
