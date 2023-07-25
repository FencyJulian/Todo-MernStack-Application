import React from 'react';
import TopHalf from './TopHalf';
import BottomHalf from './BottomHalf';
import './style.css';

const LeftSide = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopHalf />
      
    </div>
  );
};

export default LeftSide;
