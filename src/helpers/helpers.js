import NumberFormat from 'react-number-format';

export const numberFormat = (value) => {
    return <NumberFormat value={Math.round(value, 2)} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix="&#8377;" />
};

export const toSingleLine = (multiLineString, noSpaces) => {
    var delimiter = noSpaces ? '' : ' ';
    return  multiLineString.replace(/\s\s+/g, delimiter).replace(/\n/, " ");
    // return multiLineString.replace(/\n/," ");
};
