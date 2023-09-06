import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateTable, listTables, readReservation } from "../utils/api";
require("dotenv").config();

function SeatReservation() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState(0);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({});
  const { reservation_id } = useParams();
  console.log(useParams())

  useEffect(loadTables, []);
  useEffect(loadReservations, [reservation_id]);

  function loadReservations() {
    const abortController = new AbortController();
    readReservation(reservation_id).then(setReservation);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const tablesForm = tables.map((table) => {
    return (
      <option
        key={table.table_id}
        value={table.table_id}
        disabled={table.capacity < reservation.people || table.reservation_id}
      >
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  // CHANGE HANDLER

  const onChange = (event) => {
    const { target } = event;
    const value = target.value;
    setTableId(value);
    // console.log("line 38", value, [target.name], )
  };

  // SUBMIT HANDLER

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("SUBMIT TRIGGERED!!!!")
    console.log("tableID", tableId)
    if (tableId) {
      console.log("reservation_id", reservation_id);
      console.log("TableID", tableId);
      updateTable(reservation_id, tableId)
        .then(() => history.push("/"))
        // .catch(setError);
        .catch(console.log);
    }
  };

  return (
    <div>
      <h2>Select Your Seat According to Party Size</h2>
      <form name="seat-party" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="table_id">Table number:</label>
          <select
            className="ml-2 form-control w-50"
            required
            name="table_id"
            onChange={onChange}
          >
            <option>Select a Table</option>
            {tablesForm}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <button
          className="btn btn-secondary ml-1"
          type="button"
          onClick={() => history.go(-1)}
        >
          Cancel
        </button>
        <ErrorAlert error={error} />
      </form>
    </div>
  );
}

export default SeatReservation;
