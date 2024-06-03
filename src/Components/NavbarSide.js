import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import icon1 from '../Icons/icon1.png';
import icon2 from '../Icons/unselectedProduct.svg';
import icon2b from '../Icons/icon2.png';
import icon3 from '../Icons/icon3.png';
import icon3b from '../Icons/inventorycoloured.svg';
import icon4 from '../Icons/icon4.png';
import icon4b from '../Icons/materialscoloured.svg';
import icon5 from '../Icons/icon5.svg';
import icon5b from '../Icons/salescoloured.svg';
import icon6 from '../Icons/icon6.png';
import icon6b from '../Icons/documentcoloured.svg';
import icon7 from '../Icons/icon7.png';
import icon7b from '../Icons/analuticscoloured.svg';
import icon8 from '../Icons/icon8.png';
import icon8b from '../Icons/userscoloured.svg';
import icon9 from '../Icons/icon9.png';
import icon9b from '../Icons/settingscoloured.svg';
import logoutIcon from '../Icons/logoutIcon.png';
import logoutIconb from '../Icons/logoutcoloured.svg';
import leftArrow from '../Icons/arrow-left.svg';
import rightArrow from '../Icons/arrow-left.svg';
import NavbarSideIcon from './NavbarSideIcon';
import NavbarSideIconOpen from './NavbarSideIconOpen';
import '../CSS/NavbarSide.css';
export default function NavbarSide({ active, setActive }) {
  const toggleSideBar = () => {
    setActive((prev) => !prev);
  };
  return (
    <div
      className={`bg-white flex flex-col ${
        active ? ' w-64' : 'w-20'
      } h-screen items-center justify-between`}
    >
      <div className=' flex items-center flex-column gap-2 '>
        <div className=' w-full flex justify-center pt-2 pb-2 '>
          <img src={icon1} />
        </div>
        <div
          className={`relative ${active ? 'left-32' : 'left-12'} `}
          onClick={toggleSideBar}
          style={{
            top: '-0.5rem',
            marginTop: '-4px',
            marginBottom: '-20px',
            marginLeft: '-10px'
          }}
        >
          <img src={active ? leftArrow : rightArrow} />
        </div>
        <NavLink
          to='/products'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {({ isActive }) =>
            active ? (
              <NavbarSideIconOpen
                src={isActive ? icon2b : icon2}
                tittle='Products'
                isArrowDown={true}
              />
            ) : (
              <NavbarSideIcon src={isActive ? icon2b : icon2} />
            )
          }
        </NavLink>
        <NavLink to='' className={({ isActive }) => (isActive ? 'active' : '')}>
          {({ isActive }) =>
            active ? (
              <NavbarSideIconOpen
                src={isActive ? icon3b : icon3}
                tittle='Inventory'
                isArrowDown={true}
              />
            ) : (
              <NavbarSideIcon src={isActive ? icon3b : icon3} />
            )
          }
        </NavLink>
        <NavLink
          to='/materials'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {({ isActive }) =>
            active ? (
              <NavbarSideIconOpen
                src={isActive ? icon4b : icon4}
                tittle='Materials'
                isArrowDown={true}
              />
            ) : (
              <NavbarSideIcon src={isActive ? icon4b : icon4} />
            )
          }
        </NavLink>

        <NavLink
          to='/sales'
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {({ isActive }) =>
            active ? (
              <NavbarSideIconOpen
                src={isActive ? icon5b : icon5}
                tittle='Sales'
                isArrowDown={true}
              />
            ) : (
              <NavbarSideIcon src={isActive ? icon5b : icon5} />
            )
          }
        </NavLink>

        {active ? (
          <NavbarSideIconOpen src={icon6} tittle='Documents' />
        ) : (
          <NavbarSideIcon src={icon6} />
        )}
        {active ? (
          <NavbarSideIconOpen src={icon7} tittle='Analytics' />
        ) : (
          <NavbarSideIcon src={icon7} />
        )}
        {active ? (
          <NavbarSideIconOpen src={icon8} tittle='Users' />
        ) : (
          <NavbarSideIcon src={icon8} />
        )}
        {active ? (
          <NavbarSideIconOpen src={icon9} tittle='Settings' />
        ) : (
          <NavbarSideIcon src={icon9} />
        )}
      </div>
      <div className='flex-end'>
        {active ? (
          <NavbarSideIconOpen
            src={logoutIcon}
            tittle='Log Out'
            isArrowDown={false}
          />
        ) : (
          <NavbarSideIcon src={logoutIcon} />
        )}
      </div>
    </div>
  );
}
