const orders = document.getElementById('orders');

window.addEventListener('DOMContentLoaded' , async () => {
    
    const db = await axios.get('http://localhost:3000/orders');
    const element = db.data.data;
    console.log(element);

    element.forEach( element => {
        
        const elem = document.createElement('div');
        elem.setAttribute('className' , 'orderInstance');
        const ordId = document.createElement('li');
        ordId.textContent = `Order Id ==> ${element.orderId} `;
        elem.appendChild(ordId);
        const orderedProducts = document.createElement('div');
        orderedProducts.setAttribute('className' , 'orderedProducts');
        const productsOrdered = element.products;
        
        productsOrdered.forEach( item => {
            //console.log('-----------------');
            const p1 = document.createElement('div');
            p1.innerHTML = `<span> Product Name : ${item.title} </span><span> Price : ${item.price} Quanitity Ordered : ${item.orderItem.quantity}</span><img src='${item.title}'>`
            orderedProducts.appendChild(p1);
        })
        elem.appendChild(orderedProducts);

        orders.appendChild(elem); 

    });
})

