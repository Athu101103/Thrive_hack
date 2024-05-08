var express=require("express")
var bodyParser=require("body-parser")
const mongoose = require('mongoose');

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/patientinfo')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

const signatureSchema = new mongoose.Schema({
    signatureData: String
});
const Signature = mongoose.model('Signature', signatureSchema);

module.exports = Signature;


app.post('/save-signature', async (req, res) => {
    try {
        const { signature } = req.body;
        // Create a new signature document
        const newSignature = new Signature({
            signatureData: signature
        });
        // Save the signature to the database
        await newSignature.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving signature:', error);
        res.status(500).json({ success: false, error: 'Error saving signature' });
    }
});

app.post("/save-signature", async (req, res) => {
    try {
      const { signature } = req.body;
      // Save the signature data to the database
      const newSignature = await SignatureModel.create({ dataURL: signature });
      res.json({
        message: "Signature saved successfully",
        signature: newSignature,
      });
    } catch (error) {
      console.error("Error saving signature to database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

app.post("/sign_up",(req,res) => {
    var lastname    =req.body.lastname
        var firstname    =req.body.firstname
        var middlename    =req.body.middlename
        var dob    =req.body.dob
        var healthnumber    =req.body.healthnumber
        var email    =req.body.email
        var Mailingaddress    =req.body.Mailingaddress
        var city    =req.body.city
        var code    =req.body.code
        var HomeNO    =req.body.HomeNO
        var WorkNO    =req.body.WorkNO
        var notes    =req.body.notes
        var sex    =req.body.sex

    var data={
        "lastname" : lastname,
        "firstname":firstname,
        "middlename":middlename,
        "dob":dob,
        "healthnumber":healthnumber,
        "email" :email,
        "Mailingaddress" :Mailingaddress,
        "city" :city,
        "code" :code,
        "HomeNO" :HomeNO,
        "WorkNO" :WorkNO,
        "notes" :notes
    }
    db.collection('details').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_sucessful.html')
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(4000);

app.get('/signatures', async (req, res) => {
    try {
        const signatures = await Signature.find();
        res.json(signatures);
    } catch (error) {
        console.error('Error retrieving signatures:', error);
        res.status(500).json({ error: 'Error retrieving signatures' });
    }
});

const PORT = process.env.PORT || 3000; // Use the port from environment variables if available, otherwise default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
