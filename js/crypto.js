var CryptoLock = {
    salt: function(magic){
        return "SecretSalt";
    }
};
//eval(decodeURIComponent('%76%61%72%20%43%72%79%70%74%6f%4c%6f%63%6b%20%3d%20%7b%20%73%61%6c%74%3a%20%66%75%6e%63%74%69%6f%6e%28%6d%61%67%69%63%29%7b%20%72%65%74%75%72%6e%20%65%76%61%6c%28%64%65%63%6f%64%65%55%52%49%43%6f%6d%70%6f%6e%65%6e%74%28%27%25%32%32%25%36%64%25%37%39%25%35%33%25%36%35%25%36%33%25%37%32%25%36%35%25%37%34%25%35%33%25%36%31%25%36%63%25%37%34%25%32%32%27%29%29%3b%20%7d%20%7d%3b%20'));
var Crypto = {
    salt: function(){
	    return CryptoLock.salt();
	},
    encryptData: function(salt){
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
    let applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code)   

        return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('')
    },
    decryptData: function(salt){
    let textToChars = text => text.split('').map(c => c.charCodeAt(0))
    let saltChars = textToChars(salt)
    let applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code)  

        return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('')
    }
};
