import React, { useState, useEffect } from 'react';
import CreateUser from './Components/CreateUser';
import { fetchPostData } from './helper/helper';
import { Button, Table } from 'reactstrap';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

const Home = () => {
    const [list, setList] = useState([]);
    const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);
    const [selectedUserDetails, setSelectedUserDetails] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 10;
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        getList();
    }, [pageNumber]);

    const getList = async () => {
        try {
            var request = {
                Skip: pageNumber * itemsPerPage,
                Limit: itemsPerPage,
                Whether_Status_Filter: false,
                Status: true,
                Whether_Search_Filter: false,
            }
            const response = await fetchPostData('/Fetch_All_Admin_Users', request);
            if (response.success) {
                const totalCount = response.extras.Count;
                const sortedList = response.extras.Data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setList(sortedList);
                setTotalCount(totalCount);
            }
        } catch (error) {
            console.log('user fetching error ===>>> ', error.message)
        }
    };

    const handleStatus = async (status, Selected_AdminID) => {
        try {
            let URLs = status ? '/Inactivate_Admin' : '/Activate_Admin'
            const response = await fetchPostData(URLs, { Selected_AdminID });
            if (response.success) {
                toast.success(response.extras.Status)
                getList()
            }
        } catch (error) {
            console.log('user fetching error ===>>> ', error.message)
        }
    }

    const openCreateUserModal = () => {
        setCreateUserModalOpen(true);
    };

    const closeCreateUserModal = () => {
        setSelectedUserDetails(null);
        setCreateUserModalOpen(false);
    };

    const handleUpdateClick = (data) => {
        setSelectedUserDetails(data);
        setCreateUserModalOpen(true);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className='container'>
            <div className='mt-3'>
                <Table responsive bordered className='dark-table'>
                    <thead>
                        <tr className='text-center py-1'>
                            <th colSpan={5} className='h4'>All Users</th>
                            <th colSpan={2}>
                                <div>
                                    <Button className="btn btn-color-success btn-radus-padding" onClick={openCreateUserModal}>Create User</Button>
                                </div>
                            </th>
                        </tr>
                        <tr className='text-center'>
                            <th>S.no</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Edit</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {list.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.PhoneNumber}</td>
                                    <td>{item.EmailID}</td>
                                    <td className='text-center'>{item.Role_Type}</td>
                                    <td className='text-center'><Button className='btn btn-radus-padding btn-color-update' onClick={() => handleUpdateClick(item)}>Update</Button></td>
                                    <td className={`text-center ${item.Status ? "inActive" : "active"}`} onClick={() => handleStatus(item.Status, item.AdminID)}>
                                        <Button className={`btn-radus-padding ${item.Status ? 'btn btn-success' : 'btn-danger'} `}>{item.Status ? 'Active' : 'Inactive'}</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div className='pagination-container'>
                    <ReactPaginate
                        className='pagination'
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>

            <CreateUser isOpen={isCreateUserModalOpen} toggle={closeCreateUserModal} onSuccess={(() => getList())} selectedUserDetails={selectedUserDetails} />
        </div>
    );
};

export default Home;