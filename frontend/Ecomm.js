const Ecommerce = document.getElementById("Ecommerce");

const cart_items = document.querySelector('.cart_items');

const pagenation=document.querySelector(".pagenation");

Ecommerce.addEventListener( 'click' , (e) => {

    if(e.target.className == 'add-cart') {
        const id = e.target.parentNode.parentNode.id;
        addToCart(id);

        }

            if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-btn'){
                getCart();
                document.querySelector('#cart').style = "display:block;"
            }
            if (e.target.className=='cancel'){
                document.querySelector('#cart').style = "display:none;"
            }
        
            if (e.target.innerText=='REMOVE'){
                let cart_total = document.querySelector('#total-value').innerText;
                cart_total = parseFloat(cart_total).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
                document.querySelector('.cartnumber').innerText = parseInt(document.querySelector('.cartnumber').innerText)-1
                document.querySelector('#total-value').innerText = `${cart_total.toFixed(2)}`
                e.target.parentNode.parentNode.remove()
            }

            if (e.target.className == "page"){
                const reqpage=e.target.id;
                axios
                .get(`http://localhost:3000/products/?page=${reqpage}`).then((data)=>{
                const products=data.data.products;
                const pages=data.data.obj;
                // console.log(products)
                const container1=document.querySelector("#albums")
                const pagenation=document.querySelector(".pagenation")
                container1.innerHTML="";
            
                for(let i=0;i<products.length;i++){
                    console.log(products[i].id);
                    const id=products[i].id;
                    const product = document.createElement('div');
                    product.classList.add('product');
                    product.setAttribute('id',products[i].title)
                    const head=document.createElement('h3')
                    head.innerText=`${products[i].title}`;
                    product.appendChild(head)
                    const imgdiv=document.createElement('div')
                    imgdiv.classList.add('imagediv')
                    imgdiv.setAttribute('id',id);
                    const img=document.createElement('img')
                    img.classList.add('prodimg');
                    img.setAttribute('src',`${products[i].imageUrl}`)
                    img.setAttribute('alt',`${products[i].title}`)
                    imgdiv.appendChild(img)
                    product.appendChild(imgdiv)
                    const prodde=document.createElement('div')
                    prodde.classList.add("productdetails")
                    const pspa=document.createElement("span")
                    pspa.innerText=products[i].price;
                    prodde.appendChild(pspa)
                    const btn=document.createElement("button")
                    btn.classList.add("shopaddingbutton")
                    btn.setAttribute('type',"button")
                    btn.innerText="Add to cart"
                    prodde.appendChild(btn)
                    product.appendChild(prodde)
                    container1.appendChild(product)
                
        
                }
                pagenation.innerHTML="";
                if(pages.currentpage !=1 && pages.previouspage!=1){
                    const newpg=document.createElement("a")
                    newpg.setAttribute('id',`1`)
                    newpg.setAttribute("class","page")
                    newpg.innerText=`1`
                    
                    pagenation.appendChild(newpg);
                }
                if(pages.haspreviouspage ){
                    const newpg2=document.createElement("a")
                    newpg2.setAttribute("class","page")
                    newpg2.setAttribute("id",`${pages.previouspage}`)
                    newpg2.innerText=`${pages.previouspage}`
                    pagenation.appendChild(newpg2);  }
            
                const newpg1=document.createElement("a")
                newpg1.setAttribute("id",`${pages.currentpage}`)
                console.log("rendering current page")
                newpg1.setAttribute("class","page")
                newpg1.innerText=`${pages.currentpage}`
                pagenation.appendChild(newpg1);
                
            
                if(pages.hasnextpage){
                    const newpg3=document.createElement("a")
                    newpg3.setAttribute("class","page")
                    newpg3.setAttribute("id",`${pages.nextpage}`)
                    newpg3.innerText=`${pages.nextpage}`
                    pagenation.appendChild(newpg3);
                }
                if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
                    const newpg4=document.createElement("a")
                    newpg4.setAttribute("class","page")
                    newpg4.setAttribute("id",`${pages.lastpage}`)
                    newpg4.innerText=`${pages.lastpage}`
                    pagenation.appendChild(newpg4);
                }

    
                }).catch(err=>console.log(err))
 
            }
    
})

window.addEventListener('DOMContentLoaded' , async () => {
    const db = await axios.get('http://localhost:3000/products/?page=1');

    const albums = document.getElementById('albums');
    let r=1;
    for(let i=0; i<db.data.products.length ; i++){
        if(i>=2){ r = 2; }
    const elem = document.createElement('div');
        const album = document.createElement('div');
        album.innerHTML = `<h3> ${db.data.products[i].title} </h3>
        <div class="coverphoto">
            <img src="${db.data.products[i].imageUrl}" alt="" class="albumphoto">
        </div>
        <div class="album-details">
            <span>$<span>${db.data.products[i].price}</span></span>
            <button class="add-cart"> Add to Cart </button>
        </div>`
        album.setAttribute('id' , `album${i+1}`);
        elem.appendChild(album);
        elem.setAttribute('id' , `row${r}`);
    
    albums.appendChild(elem);
    }
    console.log(db);
    const pages = db.data.obj;
    pagenation.innerHTML="";
        if(pages.currentpage !=1 && previouspage!=1){
            const newpg=document.createElement("a")
            newpg.setAttribute('id',`1`)
            newpg.setAttribute("class","page")
            newpg.innerText=`1`
            
            pagenation.appendChild(newpg);
        }
        if(pages.haspreviouspage){
            const newpg2=document.createElement("a")
            newpg2.setAttribute("class","page")
            newpg2.setAttribute("id",`${pages.previouspage}`)
            newpg2.innerText=`${pages.previouspage}`
            pagenation.appendChild(newpg2);
        }
       
        const newpg1=document.createElement("a")
        newpg1.setAttribute("id",`${pages.currentpage}`)
        newpg1.setAttribute("class","page")
        newpg1.innerText=`${pages.currentpage}`
        pagenation.appendChild(newpg1)
        
        if(pages.hasnextpage){
            const newpg3=document.createElement("a")
            newpg3.setAttribute("class","page")
            newpg3.setAttribute("id",`${pages.nextpage}`)
            newpg3.innerText=`${pages.nextpage}`
            pagenation.appendChild(newpg3);
        }
        if(pages.lastpage !== pages.currentpage && pages.nextpage!==pages.lastpage){
            const newpg4=document.createElement("a")
            newpg4.setAttribute("class","page")
            newpg4.setAttribute("id",`${pages.lastpage}`)
            newpg4.innerText=`${pages.lastpage}`
            pagenation.appendChild(newpg4);
        }
    }
    
)

function addToCart(prodId) {
    console.log("hi", prodId);
    axios.post("http://localhost:3000/cart" , {productId: prodId})
    .then( (res) => {
        if(res.status == 200){
            notifyUsers(res.data.message);
        } else { throw new Error();}
    })
    .catch( (err) => console.log(err));
    
}

function getCart() {
    let cart_total=0;
    cart_items.innerHTML="";
    axios.get('http://localhost:3000/cart')
    .then( (prods) => {
        console.log(prods.data.products);
        for(let i=0; i< prods.data.products.length ; i++){

        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id' , `inCart${prods.data.products[i].id}`);
        cart_total = cart_total + prods.data.products[i].price;

        document.querySelector('#total-value').innerText = `${cart_total}`;
        
        cart_item.innerHTML = `<span class='cart-item cart-column'><img class='cart-img' src="${prods.data.products[i].imageUrl}" alt="">
            <span>${prods.data.products[i].title}</span></span>
            <span class='cart-price cart-column'>${prods.data.products[i].price}</span><span class='cart-quantity cart-column'>
            <input type="text" value="1"><button>REMOVE</button></span>`

        cart_items.appendChild(cart_item);
        }

    })
}

function notifyUsers (message) {
            const container = document.getElementById('container');
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.innerHTML = `<h4> ${message} <h4>`;
            container.appendChild(notification);

            setTimeout( () => {
                notification.remove();
            }, 2500)
}

function garbage () {
    const id = e.target.parentNode.parentNode.id;
    addToCart(id);
    axios.get('http://localhost:3000/cart')
    .then( (prods) => {
        console.log(prods.data.products[0].id);
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id' , `inCart${prods.data.products[0].id}`);
        cart_total = (parseFloat(cart_total) + parseFloat(price)).toFixed(2);

        document.querySelector('#total-value').innerText = `${cart_total}`;
        
        cart_item.innerHTML = `<span class='cart-item cart-column'><img class='cart-img' src="${prods.data.products[0].imageUrl}" alt="">
            <span>${prods.data.products[0].title}</span></span>
            <span class='cart-price cart-column'>${prods.data.products[0].price}</span><span class='cart-quantity cart-column'>
            <input type="text" value="1"><button>REMOVE</button></span>`

        cart_items.appendChild(cart_item);

    })

    // const name = document.querySelector(`#${id} h3`).innerText;
    // const img_src = document.querySelector(`#${id} img`).src;
    const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;

    let cart_total = document.querySelector('#total-value').innerText;

    // if(document.querySelector(`#incart${id}`)){
    //     alert('Already Added to cart');
    //     return;
    // } else {
        document.querySelector('.cartnumber').innerText = parseInt(document.querySelector('.cartnumber').innerText) + 1;
        // const cart_item = document.createElement('div');
        // cart_item.classList.add('cart-row');
        // cart_item.setAttribute('id' , `inCart${products.data.products[products.length-1].id}`);
        // cart_total = (parseFloat(cart_total) + parseFloat(price)).toFixed(2);

        // document.querySelector('#total-value').innerText = `${cart_total}`;
        
        // cart_item.innerHTML = `<span class='cart-item cart-column'><img class='cart-img' src="${products.data.products[products.length-1].imageUrl}" alt="">
        //     <span>${products.data.products[products.length-1].title}</span></span>
        //     <span class='cart-price cart-column'>${products.data.products[products.length-1].price}</span><span class='cart-quantity cart-column'>
        //     <input type="text" value="1"><button>REMOVE</button></span>`

        // cart_items.appendChild(cart_item);
        //}
}