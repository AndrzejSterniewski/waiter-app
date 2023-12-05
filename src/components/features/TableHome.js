import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import Row from "react-bootstrap/Row";
import TableCard from "../common/TableCard";
import Loader from "./Loader";
import { useState } from "react";

const TableHome = () => {

    // const tables = useSelector(getTableById(table => table.id));
    const tables = useSelector(getAllTables);

    const [pending, setPending] = useState(false);

    return (
        <>
            <h1>All tables</h1>
            {pending && <Loader />}
            {!pending &&
            <Row>
                {tables.map(table => <TableCard key={table.id} {...table} />)}
            </Row>
            }
        </>
    )
}

export default TableHome;
