import React from 'react';
import sandwichLogo from '../../assets/images/sandwichlogo.png';
import classes from './Logo.module.css'

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src= {sandwichLogo} alt="sandwich animated logo" />
        </div>
    )
}

export default Logo;