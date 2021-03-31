import React from 'react'
import styled from 'styled-components'

export default function FilterButton(props) {
  const { 
    handleFilter, 
    text,
    color
  } = props;

  const StyledButton = styled.button`
    all: unset;
    cursor: pointer;
    color: ${text === color ? '#3A7CFD' : '#9495A5'};

    .filter-btns__container button:nth-child(even) {
      margin: 0 .75rem;
    }

    &:hover { 
      color: ${props => props.theme.hoverColor}
    }
`;

  return (
    <StyledButton
      onClick={handleFilter}>
      {text}
    </StyledButton>
  )
}
