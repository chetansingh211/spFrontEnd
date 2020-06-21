import { Map, fromJS, List } from 'immutable';
import * as ACTION_TYPES from '../ActionTypes';

const initState = new Map({
    // scalapay configuration
    currentConfigurations: new List(),
    type: '',
    description: '',
    minimumAmount: '',
    minimumAmountcurrency: '',
    maximumAmount: '',
    maximumAmountCurrency: '',
    numberOfPayments: '',
    promotionUrl:'',
    locales:'',

    //Merchant Orders
    totalAmount: '',
    consumerGivenName: '',
    consumerSurname: '',
    consumerEmail: '',
    merchantredirectConfirmUrl: '',
    merchantredirectCancelUrl: '',

    orderToken: '',
    orderExpires: '',
    orderCheckoutUrl: '',
    changed: new List([0, 0, 0, 0, 0, 0, 0, 0, 0]),
    orderLoader: false, 
    orderMessage: '',
});

export default function OrderReducer(state = initState, action) {
    switch(action.type) {  

        case ACTION_TYPES.FETCH_CONFIGURATIONS:
            return state.set('orderLoader', false);
        
        case ACTION_TYPES.FETCH_CONFIGURATIONS_FAILED:
            return state.set('orderLoader', false)
                        .set('currentConfigurations', new List());

        case ACTION_TYPES.FETCH_CONFIGURATIONS_DONE: 
            const { data } = action;
            return state.set('currentConfigurations', fromJS(data))
                        .set('orderLoader', true)
                        .set('type', data.type)
                        .set('description', data.description)
                        .set('minimumAmount', data.minimumAmount.amount)
                        .set('minimumAmountcurrency', data.minimumAmount.currency)
                        .set('maximumAmount', data.maximumAmount.amount)
                        .set('maximumAmountCurrency', data.maximumAmount.currency)
                        .set('maximumAmountCurrency', data.maximumAmount.currency)
                        .set('numberOfPayments', data.numberOfPayments)
                        .set('promotionUrl', data.promotionUrl);                    

        case ACTION_TYPES.SET_TOTALAMOUNT:
            return state.set('totalAmount', action.value); 

        case ACTION_TYPES.SET_GIVENNAME:
            return state.set('consumerGivenName', action.value);             

        case ACTION_TYPES.SET_SURNAME:
            return state.set('consumerSurname', action.value);   

        case ACTION_TYPES.SET_EMAIL:
            return state.set('consumerEmail', action.value);   

        case ACTION_TYPES.SET_REDIRECTCONFIRMURL:
            return state.set('merchantredirectConfirmUrl', action.value);                                                   

        case ACTION_TYPES.SET_REDIRECTCANCELMURL:
            return state.set('merchantredirectCancelUrl', action.value);   

        case ACTION_TYPES.CREATE_ORDER_DONE:
            return state.set('orderToken', action.data.token)
                        .set('orderExpires', action.data.expires)
                        .set('orderCheckoutUrl', action.data.checkoutUrl);
        default:
            return state;
    }
}