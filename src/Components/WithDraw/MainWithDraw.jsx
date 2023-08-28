import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLayout } from '../../store/withDrawSlice'
import MyWithDraw from './MyWithDraw/MyWithDraw'
import WithDrawBalance from './WithDraw/WithDrawBalance'
import { Button } from 'react-bootstrap';
import Navbar from '../Navbar';
import "./main.css";

function MainWithDraw() {
    const currentLayout = useSelector((state) => state.withDrawStore.currentLayout);
    const dispatch = useDispatch();
    return (
        <>
            <Navbar />
            <div>
                <div 
                style={{
                    display: 'flex',
                    justifyContent: "space-around"
                }}
                >
                    <Button className="glow-on-hover" onClick={() => dispatch(setLayout('WithDrawBalance'))}>Request WidthDraw</Button>
                    <Button className="glow-on-hover" onClick={() => dispatch(setLayout('MyWithDraw'))}>My WithDraws</Button>
                </div>

                {currentLayout === 'WithDrawBalance' ? <WithDrawBalance /> : <MyWithDraw />}
            </div>
        </>
    )
}

export default MainWithDraw
