import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header: {
        height: 30,
        width: '100%',
        // backgroundColor: '#fcfcfc',
        // borderBottom: '1px solid rgba(0, 0, 0, .15)',
        // borderTop: '1px solid rgba(0, 0, 0, .15)',
        // borderRight: '1px solid rgba(0, 0, 0, .15)',
        lineHeight: '25px',
        marginBottom: 20,
        // marginTop: 15,
    },
    // space: {
    //     float: 'left',
    //     width: 0,
    //     height: 0,
    //     borderTop: '14px solid transparent',
    //     borderLeft: '14px solid #ac0000',
    //     borderBottom: '14px solid transparent',
    // },
    wrapper: {
        lineHeight: '0px',
        width: '100%',
        height: 3,
    },
    space: {
        height: 2,
        width: 'calc(100% - 10px)',
        backgroundColor: '#ac0000',
        display: 'inline-block',
    },
    triangle: {
        width: 0,
        height: 0,
        borderBottom: '3px solid transparent',
        borderLeft: '10px solid #ac0000',
        display: 'inline-block',
    },
    title: {
        fontSize: 16,
        margin: 0,
    }
});

const TextFieldHeader = ({title}) => {
    const classes = useStyles();
	return (
		<div className={classes.header}>
            <p className={classes.title}>{title}</p>
            <div className={classes.wrapper}>
                <div className={classes.space}/>
                {/* <div className={classes.triangle}/> */}
            </div>
        </div>
	)
}

export default TextFieldHeader;
