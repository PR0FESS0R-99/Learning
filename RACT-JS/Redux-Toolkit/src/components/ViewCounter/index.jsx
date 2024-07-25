import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// Styled components
const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 150px;

  margin: auto;
`;

const NumberDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

// Number component
const ViewNumberCard = () => {

    const {count1, count2} = useSelector(state => state.counter);

    return (
        <>
            <Card>
                <p style={{ textAlign: 'center', width: '100%' }}>COUNTER 1</p>
                <NumberDisplay>
                    {count1}
                </NumberDisplay>
            </Card>

            <Card style={{marginTop: '40px'}}>
                <p style={{ textAlign: 'center', width: '100%' }}>COUNTER 2</p>
                <NumberDisplay>
                    {count2}
                </NumberDisplay>
            </Card>
        </>
    );
};

export default ViewNumberCard;
