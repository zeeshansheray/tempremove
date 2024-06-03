import React, { createRef, useRef, useState } from 'react';
import { ExtensionService } from '../services';
import CustomTextField from './../components/CustomTextField';
import CustomSelect from './../components/CustomSelect';
import CustomButton from './../components/CustomButton';
import { CircularProgress } from '@mui/material';

const Homepage = () => {
    const ref = createRef();
    const [state, setState] = useState({
        data: null,
        searchText: '',
        searchType: 1
    });
    const [loading, setLoading] = useState(false);

    const handleSubmitFunc = async () => {
        setLoading(true);
        let payload = {
            "Search_Type": state.searchType,
            "Search_text": state.searchText
        };
        console.log('payload ', payload);
        const ApiResponse = await ExtensionService.Search({ payload });
        console.log('ApiResponse ', ApiResponse);
        setState({ ...state, data: ApiResponse.response.Response });
        setLoading(false);
    }

    console.log('state ', state);

    return (
        <div className='container'>
            <h1 className='text-center mb_32'>Search Internal/External contacts from the TDS system</h1>
            <div className='d-flex justify-content-center align-items-center mb_16'>
                <div className='w-20 mr_8'>
                    <CustomTextField
                        placeholder="Search"
                        value={state.searchText}
                        onChange={(e) => setState({ ...state, searchText: e.target.value })}
                    />
                </div>
                <div className='w-15'>
                    <CustomSelect
                        value   = {state.searchType}
                        options = {
                            <>
                                <option value={1}>Internal</option>
                                <option value={2}>External</option>
                            </>
                        }
                    />
                </div>
                <div className='ml_8'>
                    <CustomButton
                        btntext={"Search"}
                        onClick={handleSubmitFunc}
                        disabled={!state.searchText}
                        icon={loading && <CircularProgress size={14} color='inherit' />}
                    />
                </div>
            </div>
            {(state.data) ? (
                state.searchType == 1 ? (
                    <table id="users" className='mb_32'>
                        <thead>
                            <tr>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Ext</th>
                                <th>Pager</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.data.length > 0 ? 
                                state.data.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.LastName}</td>
                                        <td>{item.FirstName}</td>
                                        <td>{item.Designation}</td>
                                        <td>{item['DESCR']}</td>
                                        <td>{item.ExtensionID}</td>
                                        <td>{item.Pager}</td>
                                        <td>{item.Email}</td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        No data found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                ) : (
                    <table id="users" className='mb_32'>
                        <thead>
                            <tr>
                                <th >Organization Name</th>
                                <th>Organization ID</th>
                                <th>Phone Numbers</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state?.data?.length > 0 ?
                                state?.data?.map((item, idx) => 
                                 <tr key={idx}>
                                        <td className='capitalize'>{item.OrganizationName}</td>
                                        <td>{item.OrganizationID}</td>
                                        <td>
                                            {item?.OrgPhoneMore?.map((phone, phoneIdx) => (
                                                <div key={phoneIdx}>
                                                    <strong>{phone.TelNo}</strong><span style={{fontSize : '12px'}}> {phone.Description}</span>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                )
                                :
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>
                                        No data found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                )
            ) : null}
        </div>
    );
};

export default Homepage;
