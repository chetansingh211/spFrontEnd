import React from 'react';
import { connect } from 'react-redux';

//actions
import { getConfigurations, setTotalAmount, setGivenName, setSurName, setEmail, setRedirectConfirmUrl, 
         setRedirectCancelUrl, createOrder } from '../../store/actions/orderActions'

//components
import TextFieldHeader from '../header/TextFieldHeader';
import TextFieldComponent from '../textfield/TextFieldComponent';

import { FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import { Button } from '@material-ui/core';

import classNames from 'classnames/bind';
import styles from './orderOverview.scss';
const cx = classNames.bind(styles);

const style ={
    wrapperFull: {
        width: '100%',
        display: 'flex',
        height: 21,
        lineHeight: '21px',
    },
    title: {
        fontSize: 12,
        display: 'inline-block',
        width: 150,
        marginRight: 10,
    },
    value: {
        fontSize: 12,
        display: 'inline-block',
        width: 100,
        marginRight: 10,
    },
    textFieldWrapper: {
        width: 300,
        display: 'inline-block',
    },
    titleAddress: {
        fontSize: 12,
        display: 'inline-block',
        width: 100,
        direction: 'rtl',
        marginRight: 10,
    },
    textFieldWrapperAddress: {
        width: 100,
        display: 'inline-block',
    },
    requiredIcon: {
        fontSize: 8,
        marginBottom: 2,
        fill: '#ac0000',
    }
};

class OrderOverview extends React.Component {
    render() {
        const { classes, paymentType, description, minimumAmount, minimumAmountcurrency, maximumAmount, maximumAmountCurrency, 
                numberOfPayments, promotionUrl, orderLoader  } = this.props;
            return (       
                <div className={cx('modalContent')}>
                    <div className={cx('leftCard')}>
                        <TextFieldHeader title='Merchant Configurations' />
                        <div className={cx('textfieldHeight')}/>
                        <Button variant="outlined" className={cx('constantButton')}
                                    onClick={this.handleGetConfig}>Get Config</Button>   
                        <div className={cx('textfieldHeight')}/>
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Payment Type</div>
                                <div className={classes.title}>{paymentType}</div>
                                <div className={classes.title}>Description</div>
                                <div className={classes.title}>{description}</div>
                                <div className={classes.title}>Minimum Amount</div>
                                <div className={classes.title}>{minimumAmount} {minimumAmountcurrency}</div>
                                <div className={classes.title}>Maximum Amount</div>
                                <div className={classes.title}>{maximumAmount} {maximumAmountCurrency}</div>                                
                                <div className={classes.title}>No. of Payments</div>
                                <div className={classes.title}>{numberOfPayments}</div>

                            </div>
                        </div>
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Promotion url</div>
                                <div className={classes.wrapperFull}>{promotionUrl}</div>
                            </div>
                        </div>
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Languages supported</div>

                            </div>
                        </div>                                                
                        <div className={cx('textfieldHeight')}/>
                        <TextFieldHeader title='Order Details' />
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Total Amount <StarRateIcon className={classes.requiredIcon}/></div>
                                <FormControl className={classes.textFieldWrapper}>
                                    <TextFieldComponent
                                        disabled={!orderLoader}
                                        trueValue={this.props.totalAmount}
                                        handleChangeAction={this.props.setTotalAmount}/>
                                </FormControl>
                                <div className={classes.title}>Given Name<StarRateIcon className={classes.requiredIcon}/></div>
                                <FormControl className={classes.textFieldWrapper}>
                                <TextFieldComponent
                                        disabled={!orderLoader}
                                        trueValue={this.props.consumerGivenName}
                                        handleChangeAction={this.props.setGivenName}/>
                                </FormControl>
                                <div className={classes.title}>Sur Name<StarRateIcon className={classes.requiredIcon}/></div>
                                <FormControl className={classes.textFieldWrapper}>
                                <TextFieldComponent
                                        disabled={!orderLoader}
                                        trueValue={this.props.consumerSurname}
                                        handleChangeAction={this.props.setSurName}/>
                                </FormControl>
                                <div className={classes.title}>Email <StarRateIcon className={classes.requiredIcon}/></div>
                                <FormControl className={classes.textFieldWrapper}>
                                <TextFieldComponent
                                        disabled={!orderLoader}
                                        trueValue={this.props.consumerEmail}
                                        handleChangeAction={this.props.setEmail}/>
                                </FormControl>                                
                            </div>
                        </div>
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Redirect Confirm Url<StarRateIcon className={classes.requiredIcon}/></div>
                                <FormControl className={classes.textFieldWrapper}>
                                <TextFieldComponent
                                        disabled={!orderLoader}
                                        trueValue={this.props.merchantredirectConfirmUrl}
                                        handleChangeAction={this.props.setRedirectConfirmUrl}/>
                                </FormControl>
                            </div>
                        </div>
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Redirect Cancel Url<StarRateIcon className={classes.requiredIcon}/></div>
                                <FormControl className={classes.textFieldWrapper}>
                                <TextFieldComponent
                                        disabled={!orderLoader}
                                        trueValue={this.props.merchantredirectCancelUrl}
                                        handleChangeAction={this.props.setRedirectCancelUrl}/>
                                </FormControl>
                            </div>
                        </div>  
                        <div className={cx('textfieldHeight')}/>
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <Button variant="outlined" className={cx('constantButton')}
                                    disabled={!orderLoader} 
                                    onClick={this.handleCreateorder}>Create Order</Button>                                
                            </div>
                        </div>                          
                        <div className={cx('textfieldHeight')}/>
                        <TextFieldHeader title='Order Token Details' />  
                        <div className={cx('textfieldHeight')}>
                            <div className={classes.wrapperFull}>
                                <div className={classes.title}>Order Token</div>
                                <div className={classes.title}>{this.props.orderToken}</div>
                                <div className={classes.title}>Expiry Date</div>
                                <div className={classes.title}>{this.props.orderExpires}</div>
                            </div>
                        </div>                    
                        <div className={cx('textfieldHeight')}>
                        <div className={classes.wrapperFull}>
                            <div className={classes.title}>Checkout Url</div>
                            <div className={classes.title}>                                
                                {this.props.orderCheckoutUrl}</div>
                            </div>                            
                        </div>                    
                   </div>
            </div>
        )
    }
    handleGetConfig = (event) => {
        this.props.getConfigurations();
    }

    handleCreateorder = (event) => {
        const data = {
            "totalAmount": {  
                "amount": this.props.totalAmount,
                "currency": this.props.minimumAmountcurrency
            },
            "consumer": {  
                "givenNames": this.props.consumerGivenName,
                "surname": this.props.consumerSurname,
                "email": this.props.consumerEmail
            },
            "merchant": {
                "redirectConfirmUrl": this.props.merchantredirectConfirmUrl,
                "redirectCancelUrl": this.props.merchantredirectCancelUrl
            }    
        };
        console.log(data);
        this.props.createOrder(data);
    }


}

const mapStateToProps = (state) => {
    return {
        paymentType: state.orderReducer.get('type'),
        description: state.orderReducer.get('description'),
        minimumAmount: state.orderReducer.get('minimumAmount'),
        maximumAmountCurrency: state.orderReducer.get('maximumAmountCurrency'),
        maximumAmount: state.orderReducer.get('maximumAmount'),
        minimumAmountcurrency: state.orderReducer.get('minimumAmountcurrency'),
        numberOfPayments: state.orderReducer.get('numberOfPayments'),
        promotionUrl: state.orderReducer.get('promotionUrl'),

        totalAmount: state.orderReducer.get('totalAmount'),
        consumerGivenName: state.orderReducer.get('consumerGivenName'),
        consumerSurname: state.orderReducer.get('consumerSurname'),
        consumerEmail: state.orderReducer.get('consumerEmail'),
        merchantredirectConfirmUrl: state.orderReducer.get('merchantredirectConfirmUrl'),
        merchantredirectCancelUrl: state.orderReducer.get('merchantredirectCancelUrl'),

        orderToken: state.orderReducer.get('orderToken'),
        orderExpires: state.orderReducer.get('orderExpires'),
        orderCheckoutUrl: state.orderReducer.get('orderCheckoutUrl'),
        orderLoader: state.orderReducer.get('orderLoader'),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConfigurations: () => dispatch(getConfigurations()),
        setTotalAmount: (value) => dispatch(setTotalAmount(value)),
        setGivenName: (value) => dispatch(setGivenName(value)),
        setSurName: (value) => dispatch(setSurName(value)),
        setEmail: (value) => dispatch(setEmail(value)),
        setRedirectConfirmUrl: (value) => dispatch(setRedirectConfirmUrl(value)),
        setRedirectCancelUrl: (value) => dispatch(setRedirectCancelUrl(value)),
        createOrder: (data) => dispatch(createOrder(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(OrderOverview));