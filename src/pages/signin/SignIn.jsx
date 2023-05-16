import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Loader from '../../components/Spinner';
import { login } from '../../features/signin/siginSlice';

export default function SignIn() {
    const [creds, setCreads] = useState({
        email : '',
        password : '',
        rememberMe : false
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading } = useSelector((state)=> state.auth)

    const handleChange = (e) => {
          if(e.target.name === 'email'){
            setCreads({...creds, email : e.target.value})
          }else if(e.target.name === 'rememberMe'){
            setCreads({...creds, rememberMe : e.target.checked})
          }      
          else{
            setCreads({...creds, password : e.target.value})
          }
    }

    const handleSubmit = (e) => {
            e.preventDefault()
            dispatch(login(creds)).unwrap().then((user)=>{
                toast.success('login successfull!')
                navigate('/dashboard')
            }).catch((err)=>{
                
                toast.error(err)
            })
    }

    if(localStorage.getItem('token')){
        return <Navigate  to='/dashboard' />
    }

    if(isLoading){
        return <Loader />
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <h3 className="text-primary text-center mt-5">Sign-in</h3>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="Email">Email</Label>
                                <Input
                                    id="Email"
                                    name="email"
                                    placeholder="enter email"
                                    type="email"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Password">Password</Label>
                                <Input
                                    id="Password"
                                    name="password"
                                    placeholder="enter password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="rememberMe" className='pe-1'>rememberMe</Label>
                                <Input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={creds.rememberMe}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <Button type='submit' color='success' >Sign-in</Button>
                        </Form>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>
        </>
    );
}
