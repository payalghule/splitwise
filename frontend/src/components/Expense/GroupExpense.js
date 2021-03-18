/* eslint-disable */
import React, { Component } from 'react';
import backendServer from '../../backEndConfig';
import expensepic from '../../images/explogo.png';
import axios from 'axios';
import '../../App.css';
//to show list of groups
class GroupExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupExpense: [],
    };
  }

  componentDidMount() {
    this.setState({
      groupName: this.props.groupName,
    });
    const groupData = { gName: this.props.groupName };
    console.log('groupData: ', groupData);

    axios.defaults.withCredentials = true;
    axios
      .post(`${backendServer}/groups/getgrpexpense`, groupData)
      .then((response) => {
        console.log('response from Axios query', response.data);
        this.setState({
          groupExpense: this.state.groupExpense.concat(response.data),
        });
      })
      .catch((error) => {
        console.log('error occured while connecting to backend:', error);
      });
  }
  render() {
    console.log(this.state.groupName);

    let groupExpense = this.state.groupExpense;
    console.log(groupExpense);
    return (
      <div className="container">
        {groupExpense.map((exp) => (
          <div className="list-group">
            <li className="list-group-item inline-block">
              <div className="row">
                <div className="col">
                  <p className="mb-1">
                    <img
                      src={expensepic}
                      alt="Expense"
                      style={{ height: 'fit-content' }}
                    />
                    {exp.expDesc}
                  </p>

                  <div className="col">
                    {exp.paidbyUser} paid ${exp.amount}
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </div>
    );
  }
}

export default GroupExpense;
