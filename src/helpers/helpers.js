import NumberFormat from 'react-number-format';

export const numberFormat = (value) => {
    return <NumberFormat value={Math.round(value, 2)} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix="&#8377;" />
};

export const singleline = (multiLineString, noSpaces) => {
    var delimiter = noSpaces ? '' : ' ';
    return multiLineString.replace(/\s\s+/g, delimiter).trim();
};
