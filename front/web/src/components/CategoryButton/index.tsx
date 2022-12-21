import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import './style.css';

interface CategoryButtonProps {
  color: string;
  title: string;
  icon: IconDefinition;
  onClick: () => void;
}

const CategoryButton = ({color, title, icon, onClick}: CategoryButtonProps) => {
  return (
    <button
      style={{
        // width: 200,
        height: 163,
        backgroundColor: color, // inline css because we need it to be dynamic :)
        borderRadius: 12,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        flex: 1,
        margin: 15,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon size="2x" icon={icon} />
      <div className="genericText">{title}</div>
    </button>
  );
};

export default CategoryButton;
