import React, { useState } from 'react';

export default function Form(props) {
  return (
    <div>
      <form className="form">

        {/* <label className='form'>
          ID:
          <input type="number" name="id" id='id' />
        </label> */}

        <label className='form'>
          נקודת מוצא:
          <input type="text" name="exit" id='exit' />
        </label>

        <label className='form'>
          כתובת:
          <input type="text" name="address" id='address' />
        </label>

        <label className='form'>
          שעת יציאה:
          <input type="time" name="time" id='time' />
        </label>
        
        <label className='form'>
          נקודת יעד:
          <input type="text" name="target" id='target' />
        </label>

        <label className='form'>
          מחיר:
          <input type="number" name="price" id='price' />
        </label>

        <label className='form'>
          שם לקוח:
          <input type="text" name="customerName" id='customerName' />
        </label>

        <label className='form'>
          טלפון לקוח:
          <input type="text" name="customerPhone" id='customerPhone' />
        </label>

        <label className='form'>
          נהג:
          <input type="text" name="driver" id='driver' />
        </label>
        
      </form>
    </div>
  );
}