import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

const TableCard = (props) => {
    return (
        <Col sm={12} className="p-2">
            <Card>
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <span>
                        <Card.Title className="d-inline me-3">Table: {props.id}</Card.Title>
                        <Card.Subtitle className="d-inline">Status: <span className="fw-normal">{props.status}</span> </Card.Subtitle>
                    </span>
                    <Button as={NavLink} to={`/table/${props.id}`}>Show more</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TableCard;