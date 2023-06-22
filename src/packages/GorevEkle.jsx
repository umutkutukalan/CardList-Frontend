import React, { Component, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Pagination, Form, Button, Alert, Modal, ListGroup, Nav} from "react-bootstrap";
import SearchBar from './SearchBar';
import './ekle.css'

const GorevEkle = () => {
    const [gorev, setGorevler] = useState([]);
    const [selectedGorev, setSelectedGorev] = useState({
        ad: '',
        tanim: '',
        basTarih: '',
        bitTarih: '',
        derece: '',
        image: null
    });


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
  
      const filterCards = (card) => {
        const gorevName = `${card.ad}`.toLowerCase();
        const gorevTanim = `${card.tanim}`.toLowerCase();
        const gorevDerece = `${card.derece}`.toLowerCase();
        return gorevName.includes(searchQuery.toLowerCase()) || gorevTanim.includes(searchQuery.toLowerCase()) || gorevDerece.includes(searchQuery.toLowerCase());
      };

    

    const [currentPage, setCurrentPage] = useState(1);
    const [pageItems, setPageItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [searchQuery, setSearchQuery] = useState('');


    const handleImageSelect = (event) => {
        const selectedFile = event.target.files[0];
        setSelectedGorev(prevState => ({ ...prevState, image: selectedFile}));
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setSelectedGorev({ ...selectedGorev, [name]: value });
    }
    const handleSelectChange = (event) => {
        const{name, value} = event.target;
        setSelectedGorev({...selectedGorev, [name]: value});
    }


    useEffect(() => {
        loadCards();
      }, [currentPage]);


    function loadCards() {
        fetch(`api/cards?page=${currentPage-1}`)
            .then(res => res.json())
            .then((result) => {
                setGorevler(result.content);
                let items = [];
                for (let index = 1; index <= result.totalPages; index++) {
                    items.push(
                        <Pagination.Item key={index} active={currentPage === index} onClick={() => setCurrentPage(index)} >
                            {index}
                        </Pagination.Item>
                    );
                    setPageItems(items);
                }
            });
    }

    
    function clearForm(){
        setSelectedGorev ({
            ad: '',
            tanim: '',
            basTarih: '',
            bitTarih: '',
            derece: '',
            image: null
        })
    }
    function isNotClear() {
        return (
            selectedGorev.ad !== '' ||
            selectedGorev.tanim !== '' ||
            selectedGorev.basTarih !== '' ||
            selectedGorev.bitTarih !== '' ||
            selectedGorev.derece !== '' ||
            selectedGorev.image !== ''
        );
      }

      function saveCard() {
        fetch('/api/cards', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(selectedGorev)
        }).then((res) => res.json())
            .then((result) => {
                if (result.errorMessage) {
                    setErrorMessage(result.errorMessage);
                } else {
                    loadCards();
                    clearForm();
                    setErrorMessage(null);
                }
          });
      }

      function deleteCard(){
        fetch(`/api/cards/${selectedGorev.id}`, {
            method: 'DELETE'
        }).then(() => {
            loadCards();
            clearForm();
            handleClose();
        })
      }

      function getDereceClass() {
        if (selectedGorev.derece === 'YÜKSEK') {
            return 'text-danger';
          } else if (selectedGorev.derece === 'DÜŞÜK') {
            return 'text-primary';
          } else if (selectedGorev.derece === 'ORTA') {
            return 'text-warning';
          } else {
            return '';
          }
      }
        return (
            <>
                <Container className='container_margin' >
                    <Row>
                        <Col sm={4}>
                        <SearchBar value={searchQuery} onChange={handleSearchChange}/>
                        <Table striped bordered hover style={{tableLayout:'fixed'}}>
                            <thead>
                                <tr>  
                                    <th>Görev Adı</th>
                                    <th>Görev Tanımı</th>
                                    <th>Derecesi</th>
                                    <th>Başlangıç Tarihi</th>
                                    <th>Bitiş Tarihi</th>
                                </tr>
                                </thead>
                                <tbody>
                                {gorev.filter(filterCards).map((gorev) => (
                                    <tr key={gorev.id} onClick={() => { setSelectedGorev(gorev) }}>
                                    <td className="nowrap text-ellipsis">{gorev.ad}</td>
                                    <td className="nowrap text-ellipsis">{gorev.tanim}</td>
                                    <td>{gorev.derece}</td>
                                    <td>{gorev.basTarih}</td>
                                    <td>{gorev.bitTarih}</td>
                                    </tr>
                                ))}
                                </tbody>
                        </Table>
                        <Pagination>{pageItems}</Pagination>
                        </Col>
                        <Col sm={5} className="d-flex justify-content-center">
                            <Form className='form'>
                            <h1 className='text-center' style={{fontFamily:'Post No Bills Jaffna', fontSize:'60px'}}>Kart Oluştur</h1>
                                    {errorMessage ? (
                                    <Alert key='danger' variant='danger'>
                                        {errorMessage}
                                    </Alert>
                                ) : ('')}  
                                <Form.Group>
                                    <Form.Label className='label'>Görev Adı:</Form.Label>
                                    <Form.Control
                                    className='control'
                                    type='text'
                                    name='ad'
                                    value={selectedGorev.ad}
                                    onChange={handleInputChange}
                                    ></Form.Control>

                                    <Form.Label className='label'>Görev Tanımı:</Form.Label>
                                    <Form.Control
                                    className='control'
                                    type='text'
                                    name='tanim'
                                    value={selectedGorev.tanim}
                                    onChange={handleInputChange}
                                    ></Form.Control>

                                    <Form.Label className='label'>Başlama Tarihi:</Form.Label>
                                    <Form.Control
                                    className='control'
                                    type='date'
                                    name='basTarih'
                                    value={selectedGorev.basTarih}
                                    onChange={handleInputChange}
                                    ></Form.Control>

                                    <Form.Label className='label'>Bitiş Tarihi:</Form.Label>
                                    <Form.Control
                                    className='control'
                                    type='date'
                                    name='bitTarih'
                                    value={selectedGorev.bitTarih}
                                    onChange={handleInputChange}
                                    ></Form.Control>

                                    <Form.Label className='label'>Derecesi</Form.Label>
                                    <Form.Select
                                    className='control'
                                    name='derece'
                                    value={selectedGorev.derece}
                                    onChange={handleSelectChange}
                                    >
                                        <option value="">Seçiniz</option>
                                        <option value="DÜSÜK">DÜŞÜK</option>
                                        <option value="ORTA">ORTA</option>
                                        <option value="YÜKSEK">YÜKSEK</option>
                                    </Form.Select>

                                    {/* <Form.Label className='label'>Fotoğraf:</Form.Label>
                                    <Form.Control
                                    className='control'
                                    type='file'
                                    name='image'
                                    value={selectedGorev.image}
                                    onChange={handleImageSelect}
                                    ></Form.Control> */}
                                </Form.Group>
                                <br />
                                <div className='text-center'>
                                    <Button variant='primary' type='button' disabled={!isNotClear()} onClick={saveCard}>
                                        {selectedGorev.id ? (
                                            'Güncelle'
                                        ) : 'Oluştur'}
                                    </Button>
                                    {' '}
                                    {isNotClear() ? (
                                        <>
                                            <Button variant="outline-primary" type="button" onClick={clearForm}>
                                                Temizle
                                            </Button>{' '}
                                            {selectedGorev.id ? (<Button variant="danger" type="button" onClick={handleShow}>
                                                Sil
                                            </Button>) : ('')}
                                        </>
                                    ) : ('')}
                                </div>
                            </Form>
                        </Col>
                        <Col sm={3}>
                        {selectedGorev ? (
                        <div className='card'>
                            <div className="card-body">
                            <Nav.Link href='#'><img src='../images/CardList.png' className='resim'/></Nav.Link>
                                <a href='#' className={getDereceClass()}>{selectedGorev.derece}</a>
                                <h5 className="card-title">{selectedGorev.ad}</h5>
                                <p className='tanim'>{selectedGorev.tanim}</p>
                                <div>
                                    <p className='tarih'>Başlama Tarihi:
                                        <div style={{color: 'yellow'}}>
                                            {selectedGorev.basTarih}
                                        </div>
                                    </p>
                                    <p className='tarih'>Bitiş Tarihi:
                                        <div style={{color: 'red'}}>
                                            {selectedGorev.bitTarih}
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                        ) : (
                        <div className='card'>
                            <div className="card-body">
                            <Nav.Link href='#'><img src='../images/CardList.png' className='resim'/></Nav.Link>
                                <a href='#'>DERECE</a>
                                <h5 className="card-title">GÖREV ADI</h5>
                                <p>GÖREV TANIMI</p>
                            </div>
                        </div>
                        )}
                        </Col>
                    </Row>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Sil</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Emin misiniz?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Kapat
                            </Button>
                            <Button variant='danger' onClick={deleteCard}>Sil</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </>
        );
    }


export default GorevEkle;