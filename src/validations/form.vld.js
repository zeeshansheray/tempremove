import * as Yup from 'yup';

const BasicInformationSection = Yup.object().shape({
  currency: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  donationDepartment: Yup.string().required('Required'),
  donationSubDepartment: Yup.string().required('Required'),
  donationAmount: Yup.number().min(1).required('Donation amount is required'),
  donationType: Yup.string(),
  firstName: Yup.string().required('First Name field is required'),
  lastName: Yup.string().required('Last Name field is requried'),
  email: Yup.string().email().required('Email field is required'),
  phone: Yup.string().min(7).required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  zipCode: Yup.string().required('Zip code is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
});

export {
  BasicInformationSection,
}
