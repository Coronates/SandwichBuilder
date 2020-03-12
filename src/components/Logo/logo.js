import React from 'react';
import burguerLogo from '../../assets/images/food_burguer.png';
import classes from './Logo.module.css'

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src= {burguerLogo} alt="burguer animated logo" />
        </div>
    )
}

export default Logo;