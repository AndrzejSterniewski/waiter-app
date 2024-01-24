import { Container, FormLabel } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
    const [statusChanged, setStatusChanged] = useState(false);

    useEffect(() => {
        if (maxPeopleAmount > 10)
            setMaxPeopleAmount(10);
        if (maxPeopleAmount < 0)
            setMaxPeopleAmount(0);
        if (peopleAmount < 0)
            setPeopleAmount(0);
        if (peopleAmount > maxPeopleAmount)
            setPeopleAmount(maxPeopleAmount);
    }, [peopleAmount, maxPeopleAmount]);

    useEffect(() => {
        if (bill < 0)
            setBill(0);
    }, [bill]);

    useEffect(() => {
        if (status === 'Cleaning' || status === 'Free')
            setPeopleAmount(0);
        if (status === 'Busy' && (status !== props.status || statusChanged))
            setBill(0);
        setStatusChanged(true);
    }, [status])

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const table = useSelector(state => getTableById(state, id))
    const statuses = useSelector(getAllStatuses);

    useEffect(() => {
        if (table) {
            setStatus(table.status);
            setBill(table.bill);
            setPeopleAmount(table.peopleAmount);
            setMaxPeopleAmount(table.maxPeopleAmount);
        }
    }, [table]);

    const handleSubmit = e => {
        // e.preventDefault();
        dispatch(updateTableRequest({ id, status, peopleAmount, maxPeopleAmount, bill }));
        navigate('/');
    }

    return (
        <Container>
            <h1>Table: {id}</h1>
            <Form onSubmit={validate(handleSubmit)} style={{ width: '25%' }}>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-center" >
                    <FormLabel className="fw-bold me-3">Status: </FormLabel>
                    {/* {status} */}
                    <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                        {statuses.map((status) => (
                            <option key={status}>
                                {status}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                    <FormLabel className="fw-bold me-3">People: </FormLabel>
                    <Form.Control
                        {...register("peopleAmount", { min: 0, max: 10 })}
                        type="number" value={peopleAmount}
                        onChange={e => setPeopleAmount(e.target.value)} /> /
                    {/* {errors.peopleAmount && JSON.stringify(errors.peopleAmount)} */}
                    <Form.Control
                        {...register("maxPeopleAmount", { min: 1, max: 10 })}
                        type="number" value={maxPeopleAmount}
                        onChange={e => setMaxPeopleAmount(e.target.value)} />
                    {/* {errors.maxPeopleAmount && console.log(errors.maxPeopleAmount)} */}
                    {/* {errors.peopleAmount && <small className="d-block form-text text-danger mt-2">Number of people is incorrect (min is 1, max is 10)</small>}
                    {errors.maxPeopleAmount && <small className="d-block form-text text-danger mt-2">Number of max people is incorrect (min is 1, max is 10)</small>} */}
                </Form.Group>

                {(status === "Busy" && <Form.Group className="mb-3 d-flex justify-content-between align-items-center" style={{ width: '50%' }}>
                    <FormLabel className="fw-bold me-3">Bill: </FormLabel>
                    $ <Form.Control style={{ width: '50%' }} type="number" value={bill}
                        onChange={e => setBill(e.target.value)} />
                </Form.Group>)}

                <Button type="submit">Update</Button>
            </Form>
        </Container>
    )
}

export default TablePage;