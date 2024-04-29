import React, { useState, useRef, useEffect } from 'react';

function List({ employees, handleEdit, handleDelete }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: null
    });

    const popupRef = useRef(null);

    // State to manage the visibility of the pop-up and store selected employee details
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Function to handle click on employee name or ID and display pop-up
    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
        setIsPopupOpen(true);
    };

    // Function to close the pop-up
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // Close pop-up when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='contain-table'>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salary</th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, i) => (
                            <tr key={employee.id}>
                                <td onClick={() => handleEmployeeClick(employee)} style={{ cursor: 'pointer' }}>
                                    {employee.id}
                                </td>
                                <td onClick={() => handleEmployeeClick(employee)} style={{ cursor: 'pointer' }}>
                                    {employee.email}
                                </td>
                                <td onClick={() => handleEmployeeClick(employee)} style={{ cursor: 'pointer' }}>
                                    {employee.firstName}
                                </td>
                                <td onClick={() => handleEmployeeClick(employee)} style={{ cursor: 'pointer' }}>
                                    {employee.lastName}
                                </td>
                                <td onClick={() => handleEmployeeClick(employee)} style={{ cursor: 'pointer' }}>
                                    {formatter.format(employee.salary)}
                                </td>
                                <td className="ryt">
                                    <button
                                        onClick={() => handleEdit(employee.id)}
                                        className="edit-del"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="left">
                                    <button
                                        onClick={() => handleDelete(employee.id)}
                                        className="edit-del"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No Employees</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pop-up to display employee details */}
            {isPopupOpen && (
                <div className="popup" ref={popupRef}>
                    <div className="popup-content">
                        <h2>Employee Details</h2>
                        <p><strong>ID:</strong> {selectedEmployee.id}</p>
                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                        <p><strong>First Name:</strong> {selectedEmployee.firstName}</p>
                        <p><strong>Last Name:</strong> {selectedEmployee.lastName}</p>
                        <p><strong>Salary:</strong> {formatter.format(selectedEmployee.salary)}</p>
                        {/* Include age here if available */}
                        <span className="close" onClick={handleClosePopup}>×</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* Styles for the pop-up */
                .popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .popup-content {
                    background-color: #add8e6; /* Light blue color */
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                    max-width: 400px;
                    width: 100%;
                    position: relative;
                }

                .close {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    cursor: pointer;
                    color: red; /* Red color for close icon */
                }

                td:hover,
                button:hover,
                .popup-content p:hover {
                    background-color: #add8e6; /* Light blue color */
                    color: #fff; /* White color for text */
                }
            `}</style>
        </div>
    );
}

export default List;
