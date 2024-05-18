const express = require("express");
const db = require('./config/database');
const user = require('./models/userSchema');

const port = 8003;

const app = express();

const path = require('path');

app.set("view engine","ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(express.urlencoded({ extended: true }));

const url = 'https://superhero-search.p.rapidapi.com/api/heroes';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f9e37d5dc5mshb1cef5757eef015p1dacf0jsna6284390c072',
		'X-RapidAPI-Host': 'superhero-search.p.rapidapi.com'
	}
};
app.get('/', async (req, res) => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.render('index', { books: result });
    } catch (error) {
        return false;
    }
});

app.post('/insertData', (req, res) => {
    const { idNum, image, charName, roleName, firstAppearance, publisher } = req.body;

    user.create({ idNum, image, charName, roleName, firstAppearance, publisher })
    .then((data) => {
        res.status(200).send(`<h1 style="font-size:92px; text-align:center; margin-top:22%;">"..Data inserted successfully.."</h1>`);
        // return res.redirect('/');
        // Mujhe yaha ek question puchhna hai..!!
    })
    .catch((error) => {
        return false;
    })
})

app.get("/wishlist", (req, res) => {
    user
      .find({})
      .then((bookstables) => {
        return res.render("wishlist", {
            bookstables,
        });
      })
      .catch((err) => {
        return false;
      });
  });

  app.get("/deleteData", (req, res) => {
    let id = req.query.id;
    user
      .findByIdAndDelete(id)
      .then(() => {
        return res.redirect("wishlist");
      })
      .catch((err) => {
        return false;
      });
  });

  app.get('/editData', (req, res) => {
    let id = req.query.id;
    user.findById(id).then((data) => {
        return res.render('editData', { data });
    }).catch((err) => {
        return false;
    })
  })

  app.post('/editData/:id', (req, res) => {
    const{image, charName, roleName, firstAppearance, publisher } = req.body
    const { id } = req.params
    user.findByIdAndUpdate(id,{image, charName, roleName, firstAppearance, publisher }).then((data)=>{
        return res.redirect('/wishlist');
    }).catch((err)=>{
        return false;
    })
  })

app.get('/', (req, res) => {
    return res.render('index')
})
app.get('/wishlist', (req, res) => {
    return res.render('wishlist')
})

app.listen(port,(err)=>{
    if(err){
        console.log("Server Failed to get start");
        return false;
    }
    console.log("http://localhost:"+port)
});