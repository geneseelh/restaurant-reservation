import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ReservationForm({
  initialFormData,
  submitHandler,
  cancelHandler,
  changeHandler,
}) {
  const [formData, setFormData] = useState({ ...initialFormData });
  const { reservation_id } = useParams();

  function handleChange({ target }) {
    if (changeHandler) {
      changeHandler(target);
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    } else {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (reservation_id) {
      formData.reservation_id = reservation_id;
    }
    submitHandler(formData);
  }

  function handleCancel(event) {
    event.preventDefault();
    cancelHandler();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            className="form-control"
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            className="form-control"
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            type="tel"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
          <label htmlFor="people">Number of People</label>
          <input
            className="form-control"
            id="people"
            name="people"
            type="number"
            onChange={handleChange}
            value={formData.people}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;
