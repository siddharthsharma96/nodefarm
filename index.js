const fs =require('fs');
const http=require('http');
const url=require('url');
const slugify=require('slugify')
const replacetemplate = require('./module/replacetemplate');


/////////////////////////////////////////files////

//blocking , synchronous way
//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn);
//const textout= `so now we are inputting data : ${textIn} .\n created on ${Date.now()}`;
//fs.writeFileSync('./txt/output.txt',textout);
//console.log('file created soon');

//non-blocking asynchronous way

//fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
//    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//        console.log(data2);
//        fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//            console.log(data3);
//            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//                console.log('file written successful');
//            })
//        })
//    })
//})
//console.log('file has been readed');

///////////////////////////////////////////////////server///////////////




const tempoverview=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempproduct=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const tempcard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataobj=JSON.parse(data);

const slug=dataobj.map(el=>slugify(el.productName, { lower: true }));
console.log(slug)
const server=http.createServer((req,res)=>{
    
    ///console.log(req.url);
    const { query, pathname}=url.parse(req.url,true);
    

    //overviewpage
    if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml = dataobj.map(el => replacetemplate(tempcard, el)).join(' ');
        const output = tempoverview.replace('{%cards%}', cardsHtml);
        

        res.end(output);
       //product page 
    }else if(pathname==='/product'){
        res.writeHead(200,{'Content-type':'text/html'});
        const product=dataobj[query.id];
        const output= replacetemplate(tempproduct,product);        
        res.end(output);

        //api page
    }else if(pathname==='/api'){
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);

        //not found page
    }else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000,'127.0.0.1',()=>{
    console.log('server is running on port 80000');
})

