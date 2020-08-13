module.exports =(temp,prod)=>{
    var output=temp.replace(/{%productname%}/g, prod.productName);
    output=output.replace(/{%image%}/g, prod.image);
    output=output.replace(/{%from%}/g ,prod.from);
    output=output.replace(/{%quantity%}/g, prod.quantity);
    output=output.replace(/{%nutrients%}/g, prod.nutrients);
    output=output.replace(/{%price%}/g, prod.price);
    output=output.replace(/{%id%}/g, prod.id);
    output=output.replace(/{%description%}/g, prod.description);
    if(!prod.organic){
        output =output.replace(/{%not_organic%}/g, 'not-organic');
    } 
    return output;
}