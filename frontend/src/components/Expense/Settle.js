import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import backendServer from '../../backEndConfig';
import { Multiselect } from 'multiselect-react-dropdown';

function Settle(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [member, setMember] = useState();

  const settleUsers = props.members;
  console.log('settleUsers', settleUsers);
  const onSubmitExpense = (e) => {
    e.preventDefault();
    const settleData = {
      settleUserAmt: member[0].pendingAmt,
      settleWithUserId: member[0].uid,
      settlededById: localStorage.getItem('userid'),
    };

    console.log('settleData to post', settleData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/settle/settleup`, settleData)
      .then((response) => {
        console.log('response after Axios post', response);
        if (response.status == 200) {
          alert('Settled up sucessfully!');
          window.location.reload(false);
        }
      })
      .catch((error) => {
        alert('Failed to add expense');
        console.log('error:', error);
      });
    handleClose();
  };

  return (
    <div>
      <div>
        <button className="green-button" onClick={handleShow}>
          Settle up
        </button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false} centered>
        <div>
          <Modal.Header closeButton className="modal-header modal-head">
            <Modal.Title className="text-center">Settle Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-8">
                <form
                  className="form"
                  id="expense-form"
                  onSubmit={onSubmitExpense}
                >
                  <Multiselect
                    options={settleUsers}
                    singleSelect // Options to display in the dropdown
                    displayValue="payableTo"
                    placeholder="Select to settle"
                    onSelect={(user) => {
                      setMember(user);
                    }}
                    id="multiselect-custom"
                    style={{ chips: { background: '#5bc5a7' } }} // Property name to display in the dropdown options
                  />
                  <br></br>
                  <button
                    onClick={handleClose}
                    className="float -left orange-button"
                  >
                    close
                  </button>
                  <button type="submit" className="float-right green-button">
                    Settle
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}
export default Settle;
