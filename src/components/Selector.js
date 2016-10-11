import React, { Component } from 'react';
import Select from 'react-select';
import '../styles/Select.css';

export default class Selector extends Component{
  
  valueChange(val){
  	const { select, deselect } = this.props;

    if(val) {
  		select(val.value)
  	} else {
  		deselect()
  	}
  }

  render(){
    var {val, options, btnClass, cont} = this.props;

    if(!options) {
    	options = [];
    }

    return(
    	<div>
			<div className="room-list">
				<Select
					name="room-select"
					value={val}
					options={options.map((option, index) => {return {value: option.id, label: option.name}})}
					onChange={this.valueChange.bind(this)}
				/>
			</div>
			<div id="continue-btn" className={btnClass} onClick={cont}>Continue</div>
		</div>
    );
  }
}


