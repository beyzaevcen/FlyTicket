import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getTicketById } from '../services/ticketService';

const BookingConfirmationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketById(id);
        setTicket(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load booking details');
        setLoading(false);
      }
    };
    
    fetchTicket();
  }, [id]);
  
  const formatDate = (dateString) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <>
      <Button 
        variant="light" 
        className="mb-3" 
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col md={8}>
              <Message variant="success">
                Your ticket has been booked successfully!
              </Message>
              
              <Card className="ticket-info">
                <div className="ticket-header text-center">
                  <h4>Booking Confirmation</h4>
                </div>
                <Card.Body>
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6>Ticket ID</h6>
                      <p className="fw-bold">{ticket.ticket_id}</p>
                    </Col>
                    <Col md={6}>
                      <h6>Seat Number</h6>
                      <p className="fw-bold">{ticket.seat_number}</p>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6>Passenger Name</h6>
                      <p>{ticket.passenger_name} {ticket.passenger_surname}</p>
                    </Col>
                    <Col md={6}>
                      <h6>Email</h6>
                      <p>{ticket.passenger_email}</p>
                    </Col>
                  </Row>
                  
                  <hr />
                  
                  <h5 className="mb-3">Flight Details</h5>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6>Flight Number</h6>
                      <p>{ticket.flight_id.flight_id}</p>
                    </Col>
                    <Col md={6}>
                      <h6>Price</h6>
                      <p className="text-primary fw-bold">{ticket.flight_id.price} ₺</p>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6>From</h6>
                      <p>{ticket.flight_id.from_city.city_name}</p>
                      <p className="text-muted">{formatDate(ticket.flight_id.departure_time)}</p>
                    </Col>
                    <Col md={6}>
                      <h6>To</h6>
                      <p>{ticket.flight_id.to_city.city_name}</p>
                      <p className="text-muted">{formatDate(ticket.flight_id.arrival_time)}</p>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col>
                      <h6>Booking Date</h6>
                      <p>{formatDate(ticket.booking_date)}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              
              <div className="text-center mt-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.print()}
                  className="me-3"
                >
                  Print Ticket
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg"
                  onClick={() => navigate('/')}
                >
                  Book Another Flight
                </Button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default BookingConfirmationPage;