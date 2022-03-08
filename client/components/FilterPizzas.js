/* eslint-disable no-unused-vars */
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton'

const FilterPizzas = (props) => {
  const { pizzaCities, setSelected } = props;
  pizzaCities.unshift('All');
  return (
    <div className = 'dropdown'>
      <Dropdown>
        <DropdownButton variant="success" id="filterdropdown" title="Filter Pizza Type by City">
        <Dropdown.Menu>
          {pizzaCities.map((city, i) => {
            return (
              <Dropdown.Item
                key={i}
                value={city}
                onClick={(event) => {
                  console.log(event.target.text);
                  setSelected(event.target.text);
                }}
              >
                {city}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </DropdownButton>
      </Dropdown>
    </div>
  );
};

export default FilterPizzas;
