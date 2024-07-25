import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 1);
  padding: 20px;
  width: 300px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: auto;
  margin-top: 30px;
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #45a049; /* Darker Green */
  }
`;

export const Display = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 20px;
`;


// Styled component for the button
export const CounterViewButton = styled(Link)`
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
