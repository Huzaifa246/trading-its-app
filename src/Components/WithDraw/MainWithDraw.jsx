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
            <div className="padding-top"></div>
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: "space-around"
                    }}
                >
                    <Button
                        className={`${currentLayout === 'WithDrawBalance' ? 'withDraw-btn' : 'unselected'
                            }`}
                        onClick={() => dispatch(setLayout('WithDrawBalance'))}>Request WithDrawal</Button>
                    <Button
                        className={`${currentLayout === 'MyWithDraw' ? 'withDraw-btn' : 'unselected'
                            }`}
                        onClick={() => dispatch(setLayout('MyWithDraw'))}>My WithDrawal</Button>
                </div>

                {currentLayout === 'WithDrawBalance' ? <WithDrawBalance className={`${currentLayout === 'WithDrawBalance' ? 'withDraw-btn' : 'unselected'
                    }`} /> : <MyWithDraw />}
            </div>
        </>
    )
}

export default MainWithDraw
