import React, { useEffect, useState } from 'react'

import CustomButton from './../CustomButton';

import {FormValidation} from '../../validations/index'
import { useFormik } from 'formik/dist';
import CustomSelect from './../CustomSelect';
import CustomTextField from './../CustomTextField';
import { useNavigate } from 'react-router-dom';

export default function Form() {

  const [state, setState] = useState({
    selectedSection : 0,
  })

  const [show, setShow] = useState({
    loader : false
  })

  const navigate = useNavigate();

  const initValues = {
    designation          : '',
    currency             : '',
    country              : '',
    donationDepartment   : '',
    donationSubDepartment: '',
    donationType         : '',
    donationAmount       : null,
    paymentMode          : 'Credit/Debit Card',
    fistName             : '',
    lastName             : '',
    email                : '',
    phone                : '',
  }

  const formik = useFormik({
     initialValues   : {...initValues},
     validationSchema: FormValidation.BasicInformationSection,
     validateOnMount : true
  })

  useEffect(() => {
    document.body.style.scrollBehavior = 'smooth';
    window.scrollTo(0, document.body.scrollHeight);
    const resetScrollBehavior = () => {
      document.body.style.scrollBehavior = 'auto';
    };
    window.addEventListener('scroll', resetScrollBehavior, { once: true });
    return () => {
      window.removeEventListener('scroll', resetScrollBehavior);
    };
  }, [formik.values.country, formik.values.designation, formik.values.currency]);

  const handleSubmissionFunc = () => {
    setShow({...show, loader : true})
    if((formik.values.paymentMode == "Bank/ATM/IBFT") || (formik.values.paymentMode == "Donate via cheque")){
      setTimeout(()=>{
        console.log('formik ', formik.values);
          setShow({...show, loader : false})
          navigate(`/${formik.values.firstName}/print`, { state: formik.values });
        },2000)
    }
  }


  return (
    <div id="FormDetails">
       <div className='mt_32 container'>
           <BasicInformationSection formik={formik} setState={setState} /> 
           <DetailSection formik={formik} state={state} />
           <PaymentMode  formik={formik} state={state} />
       </div>
       <div className='d-flex w-100 justify-content-center'>
              {
              <div className='animated animatedBtn fadeInDown text-center mt_32 w-15 ml_16'>
                <CustomButton
                  btntext   = {"Continue"}
                  className = {"w-100"}
                  variant   = "secondary"
                  position  = "start"
                  onClick   = {handleSubmissionFunc}
                  disabled  = {(Object.keys(formik.errors).length > 0 ) || (state.selectedSection == 1 && !formik.values.donationAmount) }  // Check if the form has been touched
                />
              </div>}
        </div>
    </div>
  )
}


const BasicInformationSection = ({formik, state, setState}) => {
  const designation = [
    "faculty",
    "staff",
    "alumni",
    "student",
    "gratified patient",
    "Others", 
  ]
  console.log('Formik ', formik)

  const currencies = ["pkr","usd","gbp", "cad", "kes", "aed", "others"];

  const countries = ["pakistan","usa","uk","canada", "uae","keny","others"];

  return(
    <>
        <div className='animated fadeInDown'>
          <h1 className='text-center Heading30R color-theme'>Your affiliation with AKU</h1>
            <div className='d-flex mt_4 justify-content-center'>
              {
                designation.map((designation,idx)=>
                <div className='mr_24 d-flex' key={idx}>
                <input
                  type     = "radio"
                  name     = "designation"
                  value    = {designation}
                  checked  = {designation === formik.values.designation}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('designation', true);
                  }}
                />
                <Text className='Body18R ml_4 capitalize'>{designation}</Text>
                </div>
                )
              }
            </div>
          </div>
          {formik.values.designation && <div className='animated fadeInDown'>
          <h1 className='text-center Heading30R color-theme mt_40'>In which currency would you like to donate?</h1>
            <div className='d-flex mt_4 justify-content-center'>
              {
                currencies.map((currency,idx)=>
                <div className='mr_24 d-flex' key={idx}>
                <input
                  type     = "radio"
                  name     = "currency"
                  value    = {currency}
                  checked  = {currency === formik.values.currency}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('currency', true);
                  }}
                />
                <label className='Body18R ml_4 uppercase'>{currency}</label>
                </div>
                )
              }
            </div>
           </div>}
          {formik.values.currency && <div className='animated fadeInDown'>
          <h1 className='text-center Heading30R color-theme mt_40'>From which country are you supporting AKU?</h1>
            <div className='d-flex mt_4 justify-content-center'>
              {
                countries.map((country,idx)=>
                <div className='mr_24 d-flex' key={idx}>
                <input
                  type     = "radio"
                  name     = "country"
                  value    = {country}
                  checked  = {country === formik.values.country}
                  onChange={(e) => {
                      formik.setFieldTouched('country', true);
                    formik.handleChange(e);

                    }}
                />
                <label className='Body18R ml_4 uppercase'>{country}</label>
                </div>
                )
              }
            </div>
           </div>}
    </>
  )
}

const DetailSection = ({formik}) => {

  const donations = [
    {
      name : 'Campus Development & Acquisition of new equipment',
      value: 'Campus Development & Acquisition of new equipment '
    },
    {
      name: 'Patient Welfare Programme',
      value : 'Patient Welfare Programme'
    },
    {
      name: 'Research',
      value: 'Research',
    },
    {
      name : "Student Financial Assistance/Scholarship",
      value: "Student Financial Assistance/Scholarship",
    },
    {
      name: 'Unrestricted Gift',
      value: 'Unrestricted Gift'
    }
  ]

  const donationOptions = () => {
    return(
      donations.map((item, idx)=>
        <option key={idx} value={item.value}>{item.name}</option>
      )
    )
  }

  const subDepartmant = [
    {
      name : 'Any Department 1',
      value : 'Any Department 1',
    },
    {
      name : 'Any Department 2',
      value : 'Any Department 2',
    },
    {
      name : 'Any Department 3',
      value : 'Any Department 3',
    },
    {
      name : 'Any Department 4',
      value : 'Any Department 4',
    },

  ]

  const donationSubDepartmentOptions = () => {
    return(
      subDepartmant.map((item, idx)=>
        <option key={idx} value={item.value}>{item.name}</option>
      )
    )
  }

  return ( 
    <>
      {formik.values.country && <div className='animated fadeInDown'>
      <h1 className='text-center Heading30R color-theme mt_40'>How would you like to help AKU?</h1>
        <div className='w-100 d-flex justify-content-center mt_16'>
          <div className='w-55'>
            <CustomSelect 
              className   = "w-100"
              placeholder = "I would like to donate to"
              options     = {donationOptions()}
              name        = "donationDepartment"
              value       = {formik.values.donationDepartment}
              onChange    = {formik.handleChange}
            />
          </div>
        </div>
      </div>}
      {formik.values.donationDepartment && 
      <div className='w-100 d-flex justify-content-center mt_16 animated fadeInDown'>
          <div className='w-55'>
            <CustomSelect 
              className   = "w-100"
              placeholder = "Select any Schools/Institute or a specific entity"
              options     = {donationSubDepartmentOptions()}
              name        = "donationSubDepartment"
              value       = {formik.values.donationSubDepartment}
              onChange    = {formik.handleChange}
            />
          </div>
        </div>}
        {console.log('formik.errors ', formik.errors)}
        {console.log('formik.touched ', formik.touched)}

        {formik.values.donationSubDepartment && <div className='animated fadeInDown'>
          <h1 className='text-center Heading30R color-theme mt_40'>Amount you want to donate?</h1>
        <div className='w-100 d-flex justify-content-center mt_16 '>
          {console.log('formik.values.donationAmount ', formik.values )}
          <div className='w-55'>
            <CustomTextField 
              className  = "w-100"
              name       = "donationAmount"
              type       = "number"
              value      = {formik.values.donationAmount}
              onChange   = {formik.handleChange}
              helperText = {formik.errors.donationAmount}
              error      = {formik.errors.donationAmount}
            />
          </div>
        </div>
    </div>
        }
    </>
  )
}

const PaymentMode = ({formik}) => {

  const paymentModes = [
    {
      name : 'Credit/Debit Card',
      value: 'Credit/Debit Card',
    },
    {
      name : 'Bank/ATM/IBFT',
      value: 'Bank/ATM/IBFT',
    },
    {
      name : 'Donate via cheque',
      value: 'Donate via cheque',
    },
    {
      name : 'Deduct from Salary',
      value: 'Deduct from Salary',
    }
  ]

    return(
        <div className='mt_40'>
          {formik.values.donationAmount && <div className='animated fadeInDown'>
            <h1 className='text-center Heading30R color-theme'>Choose your mode of payment</h1>
            <h3 className='text-center Heading20R mt_2'>(For non-endowment donations)</h3>
              <div className='mt_4 d-flex justify-content-center mt_32'>
                {
                  paymentModes.map((mode,idx)=>
                  <div className='mr_24 d-flex' key={idx}>
                  <input
                    type     = "radio"
                    name     = "paymentMode"
                    value    = {mode.value}
                    checked  = {mode.value === formik.values.paymentMode}
                    onChange = {(e) => {
                        formik.setFieldTouched('paymentMode', true);
                        formik.handleChange(e);
                      }}
                  />
                  <label className='ml_4 uppercase'>{mode.name}</label>
                  </div>
                  )
                }
            </div>
            {((formik.values.paymentMode == "Credit/Debit Card") || (formik.values.paymentMode == "Bank/ATM/IBFT") || (formik.values.paymentMode == "Donate via cheque")) && <div className='mt_32 userForm'>
                <div className='d-flex space-between'>
                  <div className='w-49'>
                    <CustomTextField 
                      label      = {"First Name"}
                      className  = "w-100"
                      name       = "firstName"
                      onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('firstName', true);
                  }}
                      value      = {formik.values.firstName}
                      helperText = {formik.touched.firstName && formik.errors.firstName}
                      error      = {formik.touched.firstName && formik.errors.firstName}
                    />
                  </div>
                  <div className='w-49'>
                    <CustomTextField 
                      label      = {"Last Name"}
                      className  = "w-100"
                      name       = "lastName"
                      onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('lastName', true);
                  }}
                      value      = {formik.values.lastName}
                      helperText = {formik.touched.lastName && formik.errors.lastName}
                      error      = {formik.touched.lastName && formik.errors.lastName}
                    />
                  </div>
                </div>  
                <div className='d-flex space-between mt_8'>
                  <div className='w-49'>
                    <CustomTextField 
                      label      = {"Email"}
                      className  = "w-100"
                      name       = "email"
                      onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('email', true);
                  }}
                      value      = {formik.values.email}
                      helperText = {formik.touched.email && formik.errors.email}
                      error      = {formik.touched.email && formik.errors.email}
                    />
                  </div>
                  <div className='w-49'>
                    <CustomTextField 
                      label      = {"Phone"}
                      className  = "w-100"
                      type       = "number"
                      name       = "phone"
                         onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('phone', true);
                  }}
                      value      = {formik.values.phone}
                      helperText = {formik.touched.phone && formik.errors.phone}
                      error      = {formik.touched.phone && formik.errors.phone}
                    />
                  </div>
                </div> 
                <div className='w-100 d-flex space-between mt_8'>
                    <div className='w-75'>
                      <CustomTextField 
                      label      = {"Address"}
                      className  = "w-100"
                      name       = "address"
                         onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('address', true);
                  }}
                      value      = {formik.values.address}
                      helperText = {formik.touched.address && formik.errors.address}
                      error      = {formik.touched.address && formik.errors.address}
                      />
                    </div>
                    <div className='w-24'>
                      <CustomTextField 
                        label      = {"Postal/ZIP Code:"}
                        className  = "w-100"
                        name       = "zipCode"
                           onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('zipCode', true);
                  }}
                        value      = {formik.values.zipCode}
                        helperText = {formik.touched.zipCode && formik.errors.zipCode}
                        error      = {formik.touched.zipCode && formik.errors.zipCode}
                      />
                    </div>
                </div>   
                <div className='w-100 mt_8 d-flex'>
                  <div className='w-35'>
                    <CustomTextField 
                        label      = {"City"}
                        className  = "w-100"
                        name       = "city"
                           onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('city', true);
                  }}
                        value      = {formik.values.city}
                        helperText = {formik.touched.city && formik.errors.city}
                        error      = {formik.touched.city && formik.errors.city}
                        
                      />
                  </div>
                  <div className='w-35 ml_16'>
                    <CustomTextField 
                        label      = {"State/Province"}
                        className  = "w-100 "
                        name       = "state"
                           onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('state', true);
                  }}
                        value      = {formik.values.state}
                        helperText = {formik.touched.state && formik.errors.state}
                        error      = {formik.touched.state && formik.errors.state}
                      />
                  </div>
                  <div className='w-35 ml_16'>
                    <CustomTextField 
                        label      = {"Country"}
                        className  = "w-100 "
                        name       = "country"
                           onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldTouched('country', true);
                  }}
                        value      = {formik.values.country}
                        helperText = {formik.touched.country && formik.errors.country}
                        error      = {formik.touched.country && formik.errors.country}
                      />
                  </div>
                </div>            
            </div>}
          </div>}
        </div>
    )
}
