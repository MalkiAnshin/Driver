const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql');
app.use(cors());
const port = 3001;


const dbConfig = ({
  host: '127.0.0.1',
  user: 'root',
  password: '******',
  database: 'travels',
});

const connection = mysql.createConnection(dbConfig);

// בקשת GET לקבלת נתונים מהדאטהבייס
app.get('/api/data', (req, res) => {
  const sql = 'SELECT * FROM travels';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results); // שליחת הנתונים בתגובה בפורמט JSON
    }
  });
});



app.post('/post/travels', (req, res) => {
  const formData = req.body;

  // Assuming you have a MySQL connection pool set up as "connection"
  const sql = 'INSERT INTO travels SET ?';
  connection.query(sql, formData, (err, result) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data inserted into the database successfully.');
      res.sendStatus(200); // שולחים תשובת אישור לצד הלקוח
    }
  });
});
app.get('/api/drivers', (req, res) => {
  const sql = 'select * FROM drivers';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


app.listen(port, () => {
  console.log("Server listening on Port", port);
});