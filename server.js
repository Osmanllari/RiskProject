const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const app = express();
const db = new sqlite3.Database('./baza.db');


app.use(bodyParser.json());
app.use(express.static('public'));

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT) " );
  db.run("CREATE TABLE IF NOT EXISTS TProjects (user TEXT,projectname TEXT,projecttable TEXT,projectchattable TEXT)");

});

function isAuthenticated(req, res, next) {
  // Vaša logika za proveru da li je korisnik prijavljen
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized' });
  }
}

app.post('/create-project', (req, res) => {
  const { user, projectTitle, projectDescription } = req.body;
  // Pretpostavljam da vaša tabela TProjects ima kolone za title i description
  const sql = `INSERT INTO TProjects (user, projectname, projecttable) VALUES (?, ?, ?)`;

  db.run(sql, [user,projectTitle, projectDescription], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to create project' });
    } else {
      res.status(201).json({ message: 'Project created successfully', projectId: this.lastID });
    }
  });
});


app.get('/list_pro/:username', (req, res) => {
  const username = req.params.username;


  db.all('SELECT * FROM TProjects WHERE user = ?', username, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).json({ error: 'Error executing query' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.json({ status: 'success', message: 'Login successful', username });
      } else {
        res.status(401).json({ error: 'Incorrect username or password' });
      }
    });
  });
});

app.post('/create-account', (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], function(err) {
      if (err) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      res.json({ message: 'Account created successfully' });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/create-project', (req, res) => {
  const { projectTitle, projectDescription } = req.body;

  const query = `INSERT INTO TProjects (user, projectname, projecttable, projectchattable) VALUES (?, ?, ?, ?)`;

  db.run(query, [projectTitle, projectDescription, projectStartDate, projectEndDate], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Cannot save the project' });
    }
    res.json({ message: 'Project created successfully', id: this.lastID });
  });
});
