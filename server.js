let express = require('express');

let app = express();

app.use(express.static(__dirname + '/assets'));
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
    console.log('Server Started At : ', PORT);
})