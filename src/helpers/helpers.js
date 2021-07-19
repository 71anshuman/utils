import NumberFormat from 'react-number-format';

export const numberFormat = (value) => {
    return <NumberFormat value={Math.round(value, 2)} displayType={'text'} thousandsGroupStyle="lakh" thousandSeparator={true} prefix="&#8377;" />
};

export const toSingleLine = (multiLineString, noSpaces) => {
    var delimiter = noSpaces ? '' : ' ';
    return  multiLineString.replace(/\s\s+/g, delimiter).replace(/(?:\r\n|\r|\n)/g, " ");
};

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const symbols = '!@#$%^&*_-+='

export const createPassword = (length = 8, hasNumbers = true, hasSymbols = true) => {
  let chars = alpha
  chars += hasNumbers ? numbers : ''
  chars += hasSymbols ? symbols : ''
  return generatePassword(length, chars)
}

const generatePassword = (length, chars) => {
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}


export const countWords = (str) => {
  let res = [];
  str = str.replace(/[\t\n\r.?!]/gm, " ").split(" ");
  str.map((s) => {
    let trimStr = s.trim();
    if (trimStr.length > 0) {
      res.push(trimStr);
    }
    return null;
  });
  return res.length;
}

export const getInterestVsLoanAmountData = (installments) => {
  var data = [[
    'Year', 'InterestAmount', 'LoanAmount'
  ]];
  var i = 1;
  installments.forEach(installment => {
    const {capital, interest} = installment;
    data.push([i++, interest, capital]);
  });
  return data;
}