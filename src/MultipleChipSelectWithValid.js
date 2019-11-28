import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Select, FormControl, InputLabel, Input, MenuItem, Chip,
} from '@material-ui/core';

class MultipleChipSelectWithValid extends Component {
  state = {
    error: false,
  }

  onChangeWithValidation = (e) => {
    const {
      name, required, onChange, getIsValidField,
    } = this.props;
    const { value } = e.target;
    let error = false;
    onChange(e);
    error = (required && value.length === 0);
    this.setState({ error });
    if (getIsValidField) {
      getIsValidField(name, !error);
    }
  };

  render() {
    const { error } = this.state;
    const {
      name,
      value,
      label,
      fullWidth,
      classFormControl,
      classInputControl,
      classChips,
      classChip,
      classMenuItem,
      classSelect,
      selectValues,
      MenuProps,
    } = this.props;
    return (
      <FormControl className={classFormControl} fullWidth={fullWidth || false}>
        <InputLabel className={classInputControl} htmlFor={name}>{label}</InputLabel>
        <Select
          multiple
          value={value}
          className={classSelect}
          onChange={this.onChangeWithValidation}
          input={<Input id={name} name={name} error={error} />}
          renderValue={(selected) => (
            <div className={classChips}>
              {selected.map((option) => (
                <Chip key={option} label={option} className={classChip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps || {}}
        >
          {selectValues.map((option) => (
            <MenuItem key={option} value={option} className={classMenuItem}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}
MultipleChipSelectWithValid.propTypes = {
  name: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getIsValidField: PropTypes.func,
  MenuProps: PropTypes.object,
  selectValues: PropTypes.array,
  classFormControl: PropTypes.string,
  classInputControl: PropTypes.string,
  classMenuItem: PropTypes.string,
  classChips: PropTypes.string,
  classChip: PropTypes.string,
  classSelect: PropTypes.string,
};

export default MultipleChipSelectWithValid;
