import { collection, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebase-config";
import Radio from '@mui/material/Radio';
import { InputNumber } from 'antd';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import * as React from 'react';
import './HomeStyle.css';
import './Links.css';

function ProductPage() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [imgIndex, setImgIndex] = useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = (event, key) => {
        setOpenModal(true);
        setImgIndex(key)
    }
    const handleCloseModal = () => setOpenModal(false);


    const phoneRegex = /^01[0125][0-9]{8}$/
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const navigate = useNavigate();


    const [nameCheck, setNameCheck] = React.useState(false);
    const [emailCheck, setEmailCheck] = React.useState(false);
    const [adressCheck, setAdressCheck] = React.useState(false);
    const [phoneCheck, setPhoneCheck] = React.useState(false);
    const [nameErrorMessage, setNameErrorMessage] = React.useState("");
    const [adressErrorMessage, setAdressErrorMessage] = React.useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");

    const [Name, setName] = useState("");
    const onNameChange = (name) => {
        if (name.length <= 3) {
            setNameErrorMessage("name cannot be less than 3 character");
            setNameCheck(false)
        }
        if (name.length > 2) {
            setNameErrorMessage("");
            setNameCheck(true)
        }
        setName(name)
    };

    const [Email, setEmail] = useState("");
    const onEmailChange = (email) => {
        const reg = new RegExp(emailRegex);
        if (reg.test(email)) {
            setEmailErrorMessage("")
            setEmailCheck(true)
        } else {
            setEmailErrorMessage("Please enter a valid email")
            setEmailCheck(false)
        }
        setEmail(email)
    };

    const [Adress, setAdress] = useState("");
    const onAdressChange = (adress) => {
        if (adress.length <= 4) {
            setAdressErrorMessage("please enter a vaild adress");
            setAdressCheck(false)
        }
        if (adress.length > 2) {
            setAdressErrorMessage("");
            setAdressCheck(true)
        }
        setAdress(adress)
    };

    const [Phone, setPhone] = useState("");
    const onPhoneChange = (phone) => {
        const reg = new RegExp(phoneRegex);
        if (reg.test(phone)) {
            setPhoneErrorMessage("")
            setPhoneCheck(true)
        } else {
            setPhoneErrorMessage("Please enter a valid phone number")
            setPhoneCheck(false)
        }
        setPhone(phone)
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("")
        setAdress("")
        setEmail("")
        setPhone("")
        setPhoneErrorMessage("")
        setAdressErrorMessage("")
        setNameErrorMessage("")
        setEmailErrorMessage("")
    };

    const handleOrder = () => {
        createOrder()
        setOpen(false);
        setName("")
        setAdress("")
        setEmail("")
        setPhone("")
        setPhoneErrorMessage("")
        setAdressErrorMessage("")
        setNameErrorMessage("")
        setEmailErrorMessage("")
        handleClickOpenThanks()
    };

    const [openThanks, setOpenThanks] = React.useState(false);
    const handleClickOpenThanks = () => {
        setOpenThanks(true);
    };
    const handleCloseThanks = () => {
        setOpen(false);
        navigate('/Hoodies');
    };

    const [openDesc, setOpenDesc] = React.useState(false);
    const handleOpenDesc = () => {
        setOpenDesc(true);
    };
    const handleCloseDesc = () => {
        setOpenDesc(false);

    };

    const [value, setValue] = React.useState('Medium');
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const [quntity, setQuntity] = React.useState(1);
    const onNumberChange = (quntity) => {
        setQuntity(quntity)
    };

    const location = useLocation();
    const data = location.state?.data;
    const productInfo = data
    const productID = data.id

    const [subImgs, setSubImgs] = useState([]);
    const subImgsCollectionRef = collection(db, "Products", productID, "SubImgs");
    const ordersCollectionRef = collection(db, "Orders");

    const createOrder = async () => {
        await addDoc(ordersCollectionRef, { name: Name, email: Email, adress: Adress, phone: Phone, quntity: quntity, size: value });
    };



    useEffect(() => {
        const getSubImgs = async () => {
            const data = await getDocs(subImgsCollectionRef);
            setSubImgs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getSubImgs();
    }, []);

    return (
        <div class="container text-center mt-5 ">
            <div class="d-flex">
                <div class="row">
                    <div class="col-md-auto">
                        {subImgs.map((img, key) => (

                            <div class="card  m-2" style={{ width: '160px', height: '200px' }} >

                                <Modal
                                    open={openModal}
                                    onClose={handleCloseModal}>
                                    <Box sx={style}>
                                        <img class="card-img-top h-100" src={subImgs[imgIndex].img} alt="Card image cap" />
                                    </Box>
                                </Modal>

                                <img onClick={event => handleOpenModal(event, key)} key={key} class="card-img-top h-100" src={img.img} alt="Card image cap" />
                            </div>
                        ))}
                    </div>


                    <div class="col-md-auto me-5">
                        <div class="card m-1" style={{ width: '420px', height: '600px' }}>
                            <img class="card-img-top h-100" src={productInfo.photo} alt="Card image cap" />
                        </div>
                        <Button color="success" variant="outlined" onClick={handleOpenDesc}>Description</Button>
                    </div>


                    <div class="col-md-auto ms-5 mt-5">
                        <h1 class="font"> <Chip label={productInfo.name} /> </h1>
                        <h4 class="mb-5"> <Chip label={productInfo.price} /> </h4>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label"><Chip label="Choose Your Size :" /></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="Large"
                                value={value}
                                onChange={handleChange}
                                name="radio-buttons-group">
                                <FormControlLabel value="Small" control={<Radio />} label="Small" />
                                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="Large" control={<Radio />} label="Large" />
                            </RadioGroup>
                        </FormControl>

                        <div class="mt-5 mb-2">
                            <p style={{ color: "GrayText" }}> <Chip label="Choose Quntity :" /></p>
                            <InputNumber min={1} max={10} size="large"
                                onNumberChange={onNumberChange} addonBefore="Quntity" addonAfter="+/ -" defaultValue={1} />
                        </div>


                        <div class="mb-5">
                            <Button fullWidth="true" onClick={handleClickOpen}> <Fab variant="extended">
                                <LocalGroceryStoreIcon sx={{ mr: 15 }} />
                                Order Now
                            </Fab></Button>
                        </div>

                        <Dialog
                            open={open}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description">
                            <DialogTitle>{"Order Form"}</DialogTitle>

                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Kindly Enter Your Information :
                                </DialogContentText>

                                <TextField onChange={(newValue) => onNameChange(newValue.target.value)}
                                    value={Name} fullWidth margin="normal" label="Name" helperText={nameErrorMessage} />

                                <TextField onChange={(newValue) => onEmailChange(newValue.target.value)}
                                    value={Email} fullWidth margin="normal" label="Email" helperText={emailErrorMessage} />

                                <TextField onChange={(newValue) => onAdressChange(newValue.target.value)}
                                    value={Adress} fullWidth margin="normal" label="Adress" helperText={adressErrorMessage} />

                                <TextField onChange={(newValue) => onPhoneChange(newValue.target.value)}
                                    value={Phone} fullWidth margin="normal" label="Phone" helperText={phoneErrorMessage} />

                                <Dialog
                                    open={openThanks}
                                    onClose={handleCloseThanks}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description">
                                    <DialogTitle id="alert-dialog-title">
                                        {"Thanks ! "}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Your Order Has been Placed and you will be contacted soon
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseThanks}>Confirm</Button>
                                    </DialogActions>
                                </Dialog>

                            </DialogContent>

                            <DialogActions>
                                <Button color="info" variant="contained" onClick={handleClose}>Cancel</Button>
                                <Button disabled={!nameCheck || !phoneCheck || !emailCheck || !adressCheck} color="info" variant="contained" onClick={handleOrder}>Order</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={openDesc}
                            onClose={handleCloseDesc}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {"description"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <p style={{fontFamily : 'cursive'}}>
                                        THE SUMMIT HOODIE<br />
                                        Egyptian made with high quality turkish fabrics.<br />
                                        Embroidery and printing highly perfected.<br />
                                        Best quality guaranteed 👌<br />
                                        Available size: S , M , L.<br />
                                        Colors: black , beige.<br />
                                        Price: 520 LE + shipping.
                                    </p>

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDesc}>Close</Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                </div>
            </div>
        </div>
    );
}
export default ProductPage;
