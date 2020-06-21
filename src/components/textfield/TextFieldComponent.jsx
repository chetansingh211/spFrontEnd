import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    textField: {
        width: '100%',
        backgroundColor: 'white',
        '& label': {
            fontSize: 12,
        },
        '& .MuiInputBase-root': {
            '& input': { // input
                fontSize: 12,
                padding: '6px 10px',
            },
            '& .MuiSelect-root': { // select
                padding: '4px 10px',
                fontSize: 12,
            },
            '& .MuiSelect-select:focus': {
                backgroundColor: 'white',
            },
        }
    },
    menuItem: {
        minHeight: 30,
        fontSize: 12,
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `#c4c4c4 !important`,
        },
    },  
    cssFocused: {},  
    notchedOutline: {
        borderColor: '#c4c4c4 !important',
    },
    placeholder: {
        opacity: 0.5,
    },
    dropdownStyle: {
        '& .MuiList-padding': {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
};

class TextFieldComponent extends React.Component {
	render() {
    	const { classes, disabled=false, select=false, placeholder, type='string',
            trueValue, menus, menuValueKey, menuNameKey, autofocus=false, 
            inputProps={min: "0"} } = this.props;
        
        if(select) {
            return (
                <TextField disabled={disabled}
                    select
                    variant="outlined"
                    value={trueValue || ''}
                    className={classes.textField}
                    onChange={this.handleChange}
                    SelectProps={{
                        MenuProps: {
                            classes: {
                                paper: classes.dropdownStyle 
                            }
                        },
                    }}
                    InputProps={{
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}>
                <MenuItem value='' className={`${this.props.classes.menuItem} ${this.props.classes.placeholder}`}>{placeholder}</MenuItem> 
                {menus.size > 0 && menus.map((menu, index)=>{
                    return (
                        <MenuItem className={classes.menuItem} key={index} value={menu.get(menuValueKey)}>
                            <span className={classes.span}>{menu.get(menuNameKey)}</span>
                        </MenuItem>
                    )
                })}
                </TextField>
            )
        }else {
            return (
                <TextField disabled={disabled}
                    variant="outlined"
                    type={type}
                    value={trueValue || ''}
                    className={classes.textField}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    InputProps={{
                        inputProps: inputProps,
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                    }}
                    onKeyPress={this.handlePress}/>
            )
        }
    }

    handleChange = (event) => {
        if(typeof this.props.handleChangeAction === 'function') {
            this.props.handleChangeAction(event.target.value);
        }
    }

    handlePress = (event) => {
        if(event.charCode === 13 && typeof this.props.handleKeyPress === 'function') {
            this.props.handleKeyPress();
        }
    }
}


export default withStyles(styles)(TextFieldComponent);
