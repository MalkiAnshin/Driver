import React, { useState, useEffect } from 'react';
import Form from './Form';
import './index.css';
import axios from 'axios';

export default function App(props) {
  const [drive, setDrive] = useState(false);
  const [form, setForm] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [travels, setTravels] = useState([]);
  useEffect(() => {
    travelsFromServer();
  }, []);

  function travelsFromServer() {
    axios.get('http://localhost:3001/api/data')
      .then((response) => {
        setTravels(response.data);
      })
      .catch((error) => {
        console.error('שגיאה בקבלת הנתונים:', error);
      });
  }


  function submitForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    axios.post('http://localhost:3001/post/travel', formData)
      .then((response) => {
        console.log('הנתונים נשלחו בהצלחה לשרת:', response.data);
        // באפשרותך לעדכן את המשתנה travels כאן במידה הצורך
      })
      .catch((error) => {
        console.error('שגיאה בשליחת הנתונים לשרת:', error);
      });
  }


 


  useEffect(() => {
    driverFromServer();
  }, []);

  function driverFromServer() {
    axios.get('http://localhost:3001/api/drivers')
      .then((response) => {
        // אם אתה רוצה לעדכן גם את הנתונים של הנהגים בקומפוננטה הזו, אתה צריך להשתמש בפונקציה setDrivers
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('שגיאה בקבלת הנתונים:', error);
      });
  }

  const [drivers, setDrivers] = useState([]); // הוספת state נוסף לנהגים

  function addNewTravel(newTravel) {
    // הוסף את הנסיעה החדשה למערך הקיים של הנסיעות
    // setTravels((prevTravels) => [...prevTravels, newDrive]);
    setDrive(false);
    setForm(false);
  }
  
  function newTravelClick() {
    setDrive(true);
    setForm(true);
  }

  function handleShowDrivers() {
    setShowDrivers(!showDrivers);
  }

  return (
    <>
      <Clock />
      {/* עדכון קריאה לקומפוננטה Show עם הפרופ travels */}
      <Show travels={travels} />
      <button onClick={newTravelClick}>נסיעה חדשה:</button> 
      {drive && <Form onSaveDrive={addNewTravel} />}
      {form && <button type="submit" onClick={() => addNewTravel(drive)} onSubmit={submitForm}>שמור נסיעה</button>}
      <button onClick={handleShowDrivers}>הצג את כל הנהגים</button>
      {showDrivers && <><ShowDrivers drivers={drivers} /> <ShowDriversDebt drivers={drivers} /></>}
    </>
  )
}

// התאמת ShowDriversDebt לפי השינויים שבוצעו בקומפוננטה App
function ShowDriversDebt({ drivers }) {
  const [showDebtDrivers, setShowDebtDrivers] = useState(false);
  const [debtDriversCount, setDebtDriversCount] = useState(0);

  const handleShowDebtDrivers = () => {
    setShowDebtDrivers((prevState) => !prevState);
  };

  const debtDrivers = drivers.filter((driver) => driver.debt >= 100);

  useEffect(() => {
    const count = drivers.filter((driver) => driver.debt >= 100).length;
    setDebtDriversCount(count);
  }, [drivers]);

  return (
    <div>
      <button onClick={handleShowDebtDrivers}>הצג נהגים בחוב מעל 100 ש"ח</button>
      {showDebtDrivers && (
        <div className="drivers-list">
          <h2>נהגים בחוב מעל 100 ש"ח:</h2>
          <p>Total debt drivers: {debtDriversCount}</p>
          {debtDrivers.map((d, index) => (
            <div key={index} className='drivers-card'>
              <p className='drivers-info'>id: {d.id}</p>
              <p className='drivers-info'>name: {d.name}</p>
              <p className='drivers-info'>phoneNumber: {d.phoneNumber}</p>
              <p className='drivers-info'>debt: {d.debt}</p>
              <p className='drivers-info'>mail: {d.mail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// התאמת Show לקריאה למשתנה travels במקום לדף האב
function Show({ travels }) {
  const filteredTravels = travels.filter((travel) => travel.driver === null);

  return (
    <div className="travels-container">
      {filteredTravels.map((d, index) => (
        <div key={index} className="travel-card">
          <p className="info-line">נסיעה מספר: {d.id}</p>
          <p className="info-line">מוצא: {d.exit}</p>
          <p className="info-line">כתובת: {d.address}</p>
          <p className="info-line">שעה: {d.time}</p>
          <p className="info-line">יעד: {d.target}</p>
          <p className="info-line">מחיר: {d.price}</p>
          <p className="info-line">שם הלקוח: {d.customerName}</p>
          <p className="info-line">טלפון הלקוח: {d.customerPhone}</p>
          <p className="info-line">נהג: {d.driver}</p>
        </div>
      ))}
    </div>
  );
}
function ShowDrivers({ drivers }) {
  return (
    <div className="drivers-list">
      {drivers.map((d, index) => (
        <div key={index} className='drivers-card'>
          <p className='drivers-info'>id: {d.id}</p>
          <p className='drivers-info'>name: {d.name}</p>
          <p className='drivers-info'>phoneNumber: {d.phoneNumber}</p>
          <p className='drivers-info'>debt: {d.debt}</p>
          <p className='drivers-info'>mail: {d.mail}</p>
        </div>
      ))}
    </div>
  );
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="clock">
      <h2>{time.toLocaleTimeString()}</h2>
      <div className="spacer"></div>
      <h2>{time.toLocaleDateString()}</h2>
    </div>
  );
}

