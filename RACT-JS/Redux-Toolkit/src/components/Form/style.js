import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  margin: auto;

  display: flex;
  flex-direction: column;

  margin-top: 30px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition-duration: 0.4s;
  
  &:hover {
    background-color: #45a049;
  }
`;


// Styled component for the button
export const FormViewButton = styled(Link)`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition-duration: 0.4s;

  margin-top: 10px;
  
  &:hover {
    background-color: #45a049;
  }
`;
