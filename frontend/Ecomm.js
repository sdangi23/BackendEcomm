const Ecommerce = document.getElementById("Ecommerce");

const cart_items = document.querySelector('.cart_items');

Ecommerce.addEventListener( 'click' , (e) => {

    if(e.target.className == 'add-cart') {
        const id = e.target.parentNode.parentNode.id;
        const name = document.querySelector(`#${id} h3`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;

        let cart_total = document.querySelector('#total-value').innerText;

        if(document.querySelector(`#incart${id}`)){
            alert('Already Added to cart');
            return;
        } else {
            document.querySelector('.cartnumber').innerText = parseInt(document.querySelector('.cartnumber').innerText) + 1;
            const cart_item = document.createElement('div');
            cart_item.classList.add('cart-row');
            cart_item.setAttribute('id' , `inCart${id}`);
            cart_total = (parseFloat(cart_total) + parseFloat(price)).toFixed(2);

            document.querySelector('#total-value').innerText = `${cart_total}`;
            
            cart_item.innerHTML = `<span class='cart-item cart-column'><img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span></span>
                <span class='cart-price cart-column'>${price}</span><span class='cart-quantity cart-column'>
                <input type="text" value="1"><button>REMOVE</button></span>`

            cart_items.appendChild(cart_item);
            }

            const container = document.getElementById('container');
            const notification = document.createElement('div');
            notification.classList.add('notification');
            notification.innerHTML = `<h4> ${name} is added to the cart<h4>`;
            container.appendChild(notification);

            setTimeout( () => {
                notification.remove();
            }, 2500)
        }

            if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-btn'){
                console.log("Hi");
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
    
})

window.addEventListener('DOMContentLoaded' , async () => {
    const db = await axios.get('http://localhost:3000/products');

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
    }
)