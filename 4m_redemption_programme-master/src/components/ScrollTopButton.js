import { Box, Button, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
const ScrollTopButton = () => {

    const [visible, setVisible] = useState(false)
    useEffect(() => {
        var element = document.getElementById('app')
        element.addEventListener('scroll', toggleVisible);

    }, []);
    const toggleVisible = () => {
        var element = document.getElementById('app')
        const scrolled = element.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        var element = document.getElementById('app')
        element.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };


    return (

        <IconButton color='primary' onClick={scrollToTop} sx={{
            position: 'absolute', bottom: 48, right: 'auto', backgroundColor: '#21ACF011', ':hover': {
                backgroundColor: '#21ACF033'
            }
        }} style={{ display: visible ? 'inline' : 'none' }}  >
            <ArrowUpwardIcon />
        </IconButton >
    );
}

export default ScrollTopButton;