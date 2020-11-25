import React from 'react';
import API from './utils/API';
import EmpDir from "./components/EmpDir";
import "./App.css"

class App extends React.Component {
  state = {
    users: [],
    usersFiltered: [],
    order: "ascend"
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async() => {
    try {
      const response = await API.getUsers();
      console.group(response.data.results);

      const empDB = response.data.results.map(x => ({
        img: x.picture.medium,
        lastName: x.name.last,
        firstName: x.name.first,
        phone: x.phone,
        cell: x.cell,
        email: x.email
      }));

      this.setState({ users: empDB, usersFiltered: empDB });
    }catch (error) {
      console.warn(error);
    }
  }

handleInput = (val) => {
  this.setState({
    users: this.state.usersFiltered.filter((x) => x.firstName.includes(val)),
  });
};

employeeSorted = () => {
  const sortedUsers = this.state.usersFiltered;
  
  sortedUsers.sort(function (a, b) {
    console.log (a.first, "a value", b.first, "b value");

    var employeeA = a.name.first.toLowerCase();
    var employeeB = a.name.first.toLowerCase();

    if (employeeA < employeeB) {
      return -1;
    }
    if (employeeA > employeeB) {
      return 1;
    }
    return 0;
  });
  this.setState = {
    userFiltered: sortedUsers,
  };

  this.setState({
    usersFiltered: this.state.users.sort((a, b) => {
      console.log(a.first, "a value", b.first, "b value");
      var employeeA = a.first.toLowerCase();
      var employeeB = b.first.toLowerCase();
      
      if (employeeA < employeeB) {
        return 1;
      }
      if (employeeA > employeeB) {
        return -1;
      }
      return 0;
    }),
  });

  return this.setState({
    order: "ascend"
  });
};

  sortTable = (e) => {
    const key = e.target.getAttribute("data-name");

    this.setState({
      users: this.state.users.sort((a, b) => (a[key] > b[key] ? 1 : -1)),
    });
  };

  render() {
    return (
      <div className="text-center mb-4">
        <h1 className="text-center mb-4 searchbar">Employee Directory</h1>
        
          <label className="text-center mb-4" htmlFor="text">
          <input className="text-center mb-4"placeholder="Search" type="text"
          onChange={(e) => this.handleInput(e.target.value)}/></label>
       
          <EmpDir employees={this.state.users} sortTable={this.sortTable} />
      </div>
    );
  }
}

export default App;