import NumberFormat from 'react-number-format';

export const numberFormat = (value) => {
    return <NumberFormat value={Math.round(value, 2)} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix="&#8377;" />
};