var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      //Query if the table exists if not lets create it on the fly!
      db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
        (err, rows) => {
          if (rows.length === 1) {
            console.log("Table exists!");
            db.all(` select blog_id, blog_title, blog_txt from blog`, (err, rows) => {
              console.log("returning " + rows.length + " records");
              res.render('index', { title: 'Express', data: rows.reverse() });
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(`create table blog (
                     blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     blog_title text NOT NULL,
                     blog_txt text NOT NULL
                     );
                      insert into blog (blog_title, blog_txt)
                      values ('This is a great blog','Oh my goodness blogging is fun');`,
              () => {
                db.all(` select blog_id, blog_title, blog_txt from blog`, (err, rows) => {
                  res.render('index', { title: 'Express', data: rows });
                });
              });
          }
        });
    });
});

function sanitized(text){
  return true;
}

/**Add function */
router.post('/add', (req, res, next) => {
  console.log("Adding blog to table without sanitizing input! YOLO BABY!!");
  var db = new sqlite3.Database('mydb.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      //NOTE: This is dangerous! you need to sanitize input from the user
      //this is ripe for a exploit! DO NOT use this in production :)
      //Try and figure out how why this is unsafe and how to fix it.
      //HINT: the answer is in the XKCD comic on the home page little bobby tables :)

      let titleIsGood = sanitized(req.body.newtitle);
      let textIsGood = sanitized(req.body.newtext);
      if(titleIsGood && textIsGood){
        db.exec(`insert into blog (blog_title, blog_txt)
                values ('${req.body.newtitle}', '${req.body.newtext}');`)
      }
      //redirect to homepage
      res.redirect('/');
    }
  );
})

router.post('/handle_user', (req, res, next) => {
console.log("updating stuff without checking if it is valid! SEND IT! handle_user");
var db = new sqlite3.Database('mydb.sqlite3',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.log("Getting error " + err);
      exit(1);
    }

    if(req.body.delete == "delete"){
      db.exec(`delete from blog where blog_id='${req.body.id}';`);
    } else if( req.body.update == "update") {
      let titleIsGood = sanitized(req.body.title);
      let textIsGood = sanitized(req.body.text)
      if(titleIsGood && textIsGood){
        db.exec(`UPDATE blog Set blog_title = '${req.body.title}', blog_txt = '${req.body.text}' where blog_id='${req.body.id}';`);
      }
      
    }
    res.redirect('/');
  }
  );
})

module.exports = router;