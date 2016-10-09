import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import '../styles/Select.css';

export default class Selector extends Component{
  static PropTypes = {
   
  }

  render(){
    var {val, options, btnClass, select, deselect, cont} = this.props;

    return(
    	<div>
			<div className="room-list">
				<Select
					name="room-select"
					value={val}
					options={options.map((option, index) => {return {value: index, label: option.name}})}
					onChange={(val) => { val ? select(val.value) : deselect() }}
				/>
			</div>
			<div id="continue-btn" className={btnClass} onClick={cont}>Continue</div>
		</div>
    );
  }
}


