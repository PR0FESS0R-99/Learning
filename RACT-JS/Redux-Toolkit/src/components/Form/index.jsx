import React, { useState } from 'react';
import { Button, Card, FormContainer, FormViewButton, Input, Label } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from '../../features/formSlice';

// Form component
const UserForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(submit({name, username}))

        console.log("Name:", name);
        console.log("Username:", username);
        // You can add further logic here, such as sending data to a server
    };

    const formValue = useSelector((state) => state.form)



    return (
        <>
            <Card>
                <FormContainer onSubmit={handleSubmit}>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                    <Label htmlFor="username">Username:</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                    <Button type="submit">Submit</Button>
                </FormContainer>


           
            </Card>

            <Card>
                <Label>Name: {formValue.name}</Label>
                <Label>Username: {formValue.username}</Label>
            </Card>
        </>
    );
};

export default UserForm;
