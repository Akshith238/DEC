import React from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import { MenuOutlined, CloseOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import { DropdownProvider } from '../context/DropdownContext';
import { motion } from 'framer-motion';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../hooks/firebase';

const NavBar = ({ scrollPosition, setScrollPosition }) => {
    const [user, setUser] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                console.log("user logged out")
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/')
    }

    return (
        <div>
            <AppBar data-aos="fade-up" data-aos-duration="1000" className={`${scrollPosition > 600 ? "bg-black font-bold" : "bg-inherit"} `} position='fixed' elevation={7}>
                <Toolbar className='flex gap-3 justify-end'>
                    <IconButton
                        className='sm:hidden visible'
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setDropdown(!dropdown)}
                    >
                        <motion.div
                            animate={{ rotate: dropdown ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {dropdown ? <CloseOutlined /> : <MenuOutlined />}
                        </motion.div>
                    </IconButton>
                    <Button onClick={handleSignOut} color='inherit' variant="outlined" className={`transition-transform hover:-translate-y-1 duration-300 hover:bg-white hover:text-black`}>
                        Sign Out
                    </Button>
                    <Button color="inherit" variant="outlined" className=' transition-transform hover:-translate-y-1 duration-300 hover:bg-white hover:text-black' component={Link} to="/about">About</Button>
                    <Button color="inherit" variant="outlined" className=' transition-transform hover:-translate-y-1 duration-300 hover:bg-white hover:text-black' component={Link} to="/contact">Contact</Button>
                    <Typography className='font-bold'>
                        {user && user.displayName}
                    </Typography>
                    {user && (
                        <Avatar src={user.photoURL} alt={user.displayName} />
                    )}
                </Toolbar>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: dropdown ? 1 : 0, y: dropdown ? 0 : -20, scale: dropdown ? 1 : 0.9 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-16 w-1/4 shadow-lg transform-translate-x-1/2 ${
                        dropdown ? 'block' : 'hidden'
                    }`}
                >
                    {dropdown && (
                        <DropdownProvider>
                            <Dropdown />
                        </DropdownProvider>
                    )}
                </motion.div>
            </AppBar>
        </div>
    )
}

export default NavBar;
