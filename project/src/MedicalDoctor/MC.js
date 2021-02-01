import React from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import moment from 'moment';

function MC(props) {
    return (
        <div className="text-center">
            <Container className="mb-5">
                <Card style={{backgroundColor:"#f9ffe8"}}>
                    <Card.Title  style = {{fontSize: '3rem',
                    fontFamily: 'times new roman',
                    fontWeight: 'bold',
                    marginTop: '5%',
                }}>Medical Certificate</Card.Title>
                <Card.Text className="mt-4" style={{fontSize: '1.5rem',
                fontFamily: 'times new roman',
                fontStyle: 'italic',
            }}>This is to certify that patient</Card.Text>
                <Card.Title className="mt-2" style={{fontSize: "2rem",
                fontFamily:'times new roman',
                fontWeight: 'bold',
            }}>{props.name}</Card.Title>
            <Card.Text className="mt-2" style={{fontSize: '1.5rem',
                fontFamily: 'times new roman',
                fontStyle: 'italic',
            }}>is unfit for duty for a period of {props.days} days</Card.Text>
            <Card.Title  style = {{fontSize: '2rem',
                    fontFamily: 'times new roman',
                    fontWeight: 'lighter',
                    marginTop: '10px',
                }}>Medical Transcription</Card.Title>
            <Card.Text className="mt-2" style={{fontSize: '1.5rem',
                fontFamily: 'times new roman',
                fontStyle: 'italic',
            }}>This medical certificate has been issued on {moment(props.startDate).format("DD/MM/YYYY")} and is valid till {moment(props.endDate).format("DD/MM/YYYY")}</Card.Text>
            <Card.Img src={props.imageURL}
            style={{maxWidth:"10%",
                    maxHeight: "5%",
                    marginLeft: "75%",
        }}
            ></Card.Img>
            <hr
                 style={{
                    color: 'black',
                    backgroundColor: 'black',
                    height: 3,
                    maxWidth: '20%',
                    align: "right",
                    marginLeft:"70%"
                }}/>
                <Card.Text className = "text-right"
                style ={{
                    fontFamily: 'sans-serif',
                    marginRight: '11%',
                    fontSize: '0.9rem'
                }}
                >{props.doctor.Name}</Card.Text>
                </Card>
                
            </Container>
        </div>
    )
}

export default MC

