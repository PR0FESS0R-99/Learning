import React, { useState } from 'react';
import { Button, Card, CounterContainer, CounterViewButton, Display } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, decrementby5, increment, incrementby5 } from '../../features/counterSlice';

// Counter component
const Counter = () => {
    // const [count, setCount] = useState(0);

    const {count1, count2} = useSelector((state) => state.counter);
    const dispatch = useDispatch()


    const incrementNum = () => {
        dispatch(increment())
        // setCount(count + 1);
    };

    const decrementNum = () => {
        dispatch(decrement())
        // setCount(count - 1);
    };

    return (
        <>
            <Card>
                <CounterContainer>
                    <Button onClick={decrementNum}>-</Button>
                    <Display>{count1}</Display>
                    <Button onClick={incrementNum}>+</Button>
                </CounterContainer>

                <>
                    <CounterViewButton to={'/counter'}> view counter </CounterViewButton>
                </>
            </Card>

            <Card>
                <CounterContainer>
                    <Button onClick={ () => {
                        dispatch(decrementby5())
                    } }>-</Button>
                    <Display>{count2}</Display>
                    <Button onClick={ () => {
                        dispatch(incrementby5());
                    }}>+</Button>
                </CounterContainer>

                <>
                    <CounterViewButton to={'/counter'}> view counter </CounterViewButton>
                </>
            </Card>

        </>
    );
};

export default Counter;