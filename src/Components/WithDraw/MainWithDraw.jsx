import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLayout } from '../../store/withDrawSlice'
import MyWithDraw from './MyWithDraw/MyWithDraw'
import WithDrawBalance from './WithDraw/WithDrawBalance'
import { Button } from 'react-bootstrap';
import "./main.css";

function MainWithDraw() {
    const currentLayout = useSelector((state) => state.withDrawStore.currentLayout);
    const dispatch = useDispatch();
    return (
        <>
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: "space-around"
                    }}
                >
                    <Button
                        className={`${currentLayout === 'WithDrawBalance' ? 'glow-on-hover' : 'unselected'
                            }`}
                        onClick={() => dispatch(setLayout('WithDrawBalance'))}>Request WidthDraw</Button>
                    <Button
                        className={`${currentLayout === 'MyWithDraw' ? 'glow-on-hover' : 'unselected'
                            }`}
                        onClick={() => dispatch(setLayout('MyWithDraw'))}>My WithDraws</Button>
                </div>

                {currentLayout === 'WithDrawBalance' ? <WithDrawBalance /> : <MyWithDraw />}
            </div>
        </>
    )
}

export default MainWithDraw
