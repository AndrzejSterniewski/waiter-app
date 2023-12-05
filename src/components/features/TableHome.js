import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import Row from "react-bootstrap/Row";
import TableCard from "../common/TableCard";
import Loader from "../views/Loader";

const TableHome = () => {

    // const tables = useSelector(getTableById(table => table.id));
    const tables = useSelector(getAllTables);

    return (
        <>
            <h1>All tables</h1>
            {(tables.length === 0) && <Loader />}
            <Row>
                {tables.map(table => <TableCard key={table.id} {...table} />)}
            </Row>
        </>
    )
}

export default TableHome;
