import React, { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './header.css';

export default function Header() {
    return <>
        <div className='header'>
            <Navbar expand='lg'>
                <Container>
                    <div>
                    <Navbar.Brand className='brand' href='/'>CardList</Navbar.Brand>
                    <Navbar.Toggle className='toggle' aria-controls="basic-navbar-nav"></Navbar.Toggle>
                    </div>
                    <div className='option'>
                    <Navbar.Collapse className='collapse' id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link className='link' href='/gorevEkle'>Ekle</Nav.Link>
                            <Nav.Link className='link' href='/gorevListesi'>Liste</Nav.Link>
                            <Nav.Link className='link' href='/gorevKartlari'>Kartlar</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </div>
        <br />
        <Outlet></Outlet>
    </>
}