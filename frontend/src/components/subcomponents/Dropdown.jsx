import {Dropdown as ReactDropdown} from "react-bootstrap";

export const Dropdown = ({dropdownSelection, setDropdownSelection, text, options }) => {

  return (
    <ReactDropdown>
      <ReactDropdown.Toggle variant="secondary" id="dropdown-basic">
        {dropdownSelection || text}
      </ReactDropdown.Toggle>
      <ReactDropdown.Menu>
        {options.map((optionText, idx) => {
          return (
            <ReactDropdown.Item
              onClick={(e) => setDropdownSelection(e.target.text)}
              key={idx}
            >
              {optionText}
            </ReactDropdown.Item>
          );
        })}
      </ReactDropdown.Menu>
    </ReactDropdown>
  );
};
