import React from "react";
import { useState, useEffect } from "react";

export default function SearchAutoComplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);
    if (query.length > 0) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];
      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      console.log(data);
      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        setError(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  }
  useEffect(() => {
    fetchListOfUsers();
  }, []);

  console.log(users, filteredUsers);

  return (
    <div className="app-container">
      <h1 className="logo">DummyJson API</h1>
      <p className="instructions">Search for users by their first name:</p>
      <div className="search-autocomplete-container">
        <input
          value={searchParam}
          name="search-users"
          placeholder="Search Users Here.."
          onChange={handleChange}
        />
        {showDropdown && (
          <div className="dropdown">
            {filteredUsers.length ? (
              filteredUsers.map((user, index) => (
                <div key={index} className="dropdown-item">
                  {user}
                </div>
              ))
            ) : (
              <div className="dropdown-item">No users found</div>
            )}
          </div>
        )}
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Error fetching users</div>}
      </div>
      <div className="user-list">
        <h2>Available Users:</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
