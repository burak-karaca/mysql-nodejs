const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpassword',
  database: 'todoapp'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.render('error.ejs', { error: 'Error fetching tasks from the database.' });
      return;
    }
    res.render('index.ejs', { tasks: results });
  });
});

app.post('/', (req, res) => {
  const task = req.body.task;
  db.query('INSERT INTO tasks (task) VALUES (?)', [task], err => {
    if (err) {
      res.render('error.ejs', { error: 'Error adding task to the database.' });
      return;
    }
    res.redirect('/');
  });
});

app.delete('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  db.query('DELETE FROM tasks WHERE id = ?', [taskId], err => {
    if (err) {
      res.status(500).json({ error: 'Error deleting task from the database.' });
      return;
    }
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
