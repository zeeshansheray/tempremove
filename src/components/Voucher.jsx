import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export default function Voucher() {

  const location = useLocation();

  useEffect(()=>{
    window.print();
  },[])

  console.log('location?.state ', location?.state)

  return (
    <div id="Voucher">
      <div className='pdfContent'>
          <SingleSection amount={location?.state?.donationAmount} currency={location?.state?.currency || 0} firstName={location?.state?.firstName} LastName={location?.state?.lastName} date={"26-Feb-24"} copyType="Parents/Student Copy" />
          <SingleSection amount={location?.state?.donationAmount}  currency={location?.state?.currency || 0}  firstName={location?.state?.firstName} LastName={location?.state?.lastName} date={"26-Feb-24"} copyType=" Bank Copy"/>
          <SingleSection amount={location?.state?.donationAmount}  currency={location?.state?.currency || 0}  firstName={location?.state?.firstName} LastName={location?.state?.lastName} date={"26-Feb-24"} copyType="AKU Copy"/>
      </div>
    </div>
  )
}

const SingleSection = ({copyType, date, firstName, LastName, currency, amount}) => {
  console.log('currency ', currency)
  return(
    <div className='singleSection'>
      <header className='d-flex space-between align-items-center'> 
        <img className='bankLogo' src="https://vectorseek.com/wp-content/uploads/2020/12/HBL-logo-vector.png" width={"auto"} height={"20px"} />
        <h3 className='Body12B'>Aga Khan University, Pakistan</h3>
      </header>

      <section className='mt_32'>
        <div className='d-flex space-between'>
          <p className='Body12R'>Challan Date: <span className='ml_4 date fw-7'>&nbsp;{date}&nbsp;</span></p>
          <p className='Body12B'>{copyType}</p>
        </div>

        <div className='d-flex space-between mt_10'>
          <p className='Body12R'>Voucher No: <span className='ml_4 date fw-7'>&nbsp;27545995&nbsp;</span></p>
          <p className='Body12R'>Bill Id: <span className='ml_4 date fw-7'>&nbsp;100114501027545995&nbsp;</span></p>
        </div>
        
        <div className='text-center Body10B mt_16 creditBox'>
          Credit to AKES,P Main Collection A/c at State Life Cash Management <br/>
          Branch 0042-79000014-03
        </div>

        <div className='d-flex mt_10 space-between'>
          <p className='Body12R'>Donor Name: <span className='ml_4 date fw-7'>&nbsp;{firstName}&nbsp;{LastName}&nbsp;</span></p>
          <p className='Body12R'>Currency: <span className='ml_4 date fw-7'>&nbsp;{currency}&nbsp;</span></p>
        </div>

        <section className='mt_10'>
          <table>
            <tr>
             <th className='Body12B text-center'>
                 Particulars
               </th>
               <th className='Body12B  text-center'>
                 Amount
               </th>
            </tr>
            <tr>
              <td className='Body12R'>AKU Giving Donation</td>
              <td className='Body12B text-right'>{Number(amount).toLocaleString()}&nbsp;</td>
            </tr>
            <tr>
              <td className='Body12B'>Total Payable After 19-Feb-2024</td>
              <td className='Body12B text-right'>{Number(amount).toLocaleString()}&nbsp;</td>
            </tr>
          </table>
          <section className='mt_130'>
            <div className='d-flex space-between mt_10'>
              <p className='Body12R'>Deposited By: <span className='ml_4  fw-7'>__________</span></p>
              <p className='Body12R'>Cashier: <span className='ml_4  fw-7'>____________</span></p>
            </div>
          </section>

          <section className='mt_10 infoText'>
            <div>
              <span className='Caption12B'>Fee can be paid using any one of the following methods:</span>
              <div className='Body10R'>
              1. Bill through any Mobile Banking or Easy paisa and JazzCash.  <br/>
              2. HBL Konnect Agent or HBL Internet / Mobile Banking. <br/>
              3. Visit any nearest HBL bank branch for cash deposit .  <br/><br/>
                <div className='text-center Caption12B'>Fund Transfer/IBFT will Not be accepted  </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}
