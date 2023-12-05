import { Container, FormLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getTableById } from "../../redux/tablesRedux";
import Button from 'react-bootstrap/Button';
import { updateTableRequest } from "../../redux/tablesRedux";
import { getAllStatuses } from "../../redux/statusesRedux";

const TablePage = (props) => {

    const [status, setStatus] = useState(props.status || '');
    const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '');
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
    const [bill, setBill] = useState(props.bill || '');

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const { id } = useParams();

    const table = useSelector(state => getTableById(state, id))
    const statuses = useSelector(getAllStatuses);

    const handleSubmit = e => {
        // e.preventDefault();
        dispatch(updateTableRequest({ id, status, peopleAmount, maxPeopleAmount, bill }));
    }

    return (
        <Container>
            <h1>Table: {table.id}</h1>
            <Form onSubmit={validate(handleSubmit)}>

                <Form.Group className="mb-3">
                    <FormLabel>Status: {status}</FormLabel>
                    <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                        {statuses.map((status) => (
                            <option key={status}>
                                {status}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FormLabel>People: </FormLabel>
                    <Form.Control
                        {...register("peopleAmount", { required: true, min: 1, max: 10 })}
                        type="number" value={peopleAmount}
                        onChange={e => setPeopleAmount(e.target.value)} /> /
                    <Form.Control
                        {...register("maxPeopleAmount", { required: true, min: 1, max: 10 })}
                        type="number" value={maxPeopleAmount}
                        onChange={e => setMaxPeopleAmount(e.target.value)} />
                    {errors.peopleAmount && <small className="d-block form-text text-danger mt-2">Number of people is incorrect (min is 1, max is 10)</small>}
                    {errors.maxPeopleAmount && <small className="d-block form-text text-danger mt-2">Number of max people is incorrect (min is 1, max is 10)</small>}
                </Form.Group>

                {(status === "Busy" && <Form.Group className="mb-3">
                    <FormLabel>Bill: </FormLabel>
                    <Form.Control type="number" value={bill}
                        onChange={e => setBill(e.target.value)} />
                </Form.Group>)}

                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}

export default TablePage;