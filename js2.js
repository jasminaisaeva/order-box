let menu_list = document.getElementById('menu-list')
let orders_list = document.getElementById('orders-list')
let sum = document.getElementById('sum')
let items_count = document.getElementById('items-count')
// date - дата, убакыт
// data - Данные, маалымат
const renderMenuItem = (product) => {
    return `
        <div class="foot-card" data-product='${JSON.stringify(product)}' onclick="onClickCard(event)">
            <img class="foot-img" src="${product.img}" alt="">
            <div>
                <div>${product.title}</div>
                <div>${product.price} som</div>
            </div>
        </div>
    `
}
const renderOrderItem = (orderItem) => {
    return `
        <li class="order-item">
            <div> ${orderItem.title}</div>
            <span> ${orderItem.count} </span>
            <span>${orderItem.price}som</span>
            <span id="delete"  onclick="onDelete(event)" data-order='${JSON.stringify(orderItem)}'>X</span>
        </li>
    `
}
// "''"
// '""'
// ""{name: 'blalala'}""
const renderOrders = (list) => {
    let items = []
    list.map((item, index) => {
        items.push(renderOrderItem(item))
    })
    orders_list.innerHTML = items.join('')
}
const renderMenuList = (list) => {
    let items = []
    list.map((item, index) => {
        items.push(renderMenuItem(item))
    })
    menu_list.innerHTML = items.join('')
}
const onClickCard = (event) => {
    // console.log(event.target)
    let card = JSON.parse(event.currentTarget.dataset.product)
    let currentIndex = orders_basket.findIndex(el => el.id == card.id)
    // findIndex - 0, 1, 2 ...
    // findIndex = -1, 
    // indefOF = -1
    if (currentIndex == -1) {
        orders_basket.push({
            ...card,
            count: 1
        })
    } else {
        orders_basket[currentIndex].count++
        orders_basket[currentIndex].price += card.price
    }
  
    solveSum()
    getCount()
    renderOrders(orders_basket)
   
}
const onDelete = (event) => {
    // event.currentTarget.parentNode.remove() 
  let current_order = JSON.parse(event.currentTarget.dataset.order)
  let currentIndex = orders_basket.findIndex(el => el.id == current_order.id)
  let item_price = menuItems.find(el => el.id == current_order.id).price
  if( current_order.count > 1){
      orders_basket[currentIndex].count--
     orders_basket[currentIndex].price -= item_price
     renderOrders(orders_basket)

  }else{
    orders_basket.splice(currentIndex,1)
    renderOrders(orders_basket)
    }
    solveSum()
    getCount()
 
}

const solveSum = () => {
    sum.innerHTML = orders_basket.reduce((el, {price}) => el + price, 0)
    
}
const getCount = () => {
    items_count.innerHTML = orders_basket.reduce((el, {count}) => el + count, 0)
}
renderMenuList(menuItems)