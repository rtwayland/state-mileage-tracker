import React from 'react'
import styled, { css } from 'react-emotion'
import { NavLink } from 'react-router-dom'

const NavContainer = styled('nav')({
  backgroundColor: '#333333',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50
})
const navItem = css({
  color: '#abcdef',
  padding: 15,
  '&.active': {
    textDecoration: 'underline'
  },
  ':hover': {
    color: '#abcdef',
    textDecoration: 'underline'
  }
})
const Nav = () => (
  <NavContainer>
    <div>
      <NavLink className={navItem} activeClassName="active" exact to="/">
        Enter Mileage
      </NavLink>
      <NavLink className={navItem} activeClassName="active" to="/fuel">
        Enter Fuel
      </NavLink>
    </div>
    <div>
      <NavLink to="/data" className={navItem} activeClassName="active">
        View Data
      </NavLink>
    </div>
  </NavContainer>
)

export default Nav
