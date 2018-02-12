const categoryConstants = {
    ALL: 'all',
    BEVERAGES: 'beverages',
}
const categories = [ categoryConstants.ALL, categoryConstants.BEVERAGES, "fruits", "snacks" ];
const totalItems = [
    {
        "name": "tea",
        "category": categoryConstants.BEVERAGES,
        "img": "tea.jpg"
    },
    {
        "name": "coffee",
        "category": categories[1],
        "img": "coffee.jpg"
    },
    {
        "name": "apple",
        "category": categories[2],
        "img": "apple.jpg"
    },
    {
        "name": "maggi",
        "category": categories[3],
        "img": "maggi.jpg"
    }
];
const status = ["Pending", "Current", "Completed"];

let itemsListNode = null;
let currentOrderNode = null;
let pendingListNode = null;
let orderListNode =  null;
let categoryListNode = null;
let pendingOrder = [];
let categorySelected = categories[0];
let currentCount = 0;
let pendingCount = 0;
let currentOrderItems = {};

//if possible remove
function onLoadFunction() {
    itemsListNode = document.getElementById("menu");
    currentOrderNode = document.getElementById("current-ordered");
    pendingListNode = document.getElementById("pending-orders");
    categoryListNode = document.getElementById("lower-header-items");
    showItemsList(totalItems);
    //LoadCategories();
}

function LoadCategories() { //todo: fix
    categories.map((category) => {
        const categoryNode = document.createElement("button");
        categoryNode.setAttribute("id",category);
        const state = (category === categorySelected)?"-selected":"";
        categoryNode.setAttribute("class", `header-button${state}`);
        categoryNode.innerHTML = `${category}`;
        categoryNode.onclick = switchCategory;
        categoryListNode.appendChild(categoryNode);
    })
}

function switchCategory(obj) 
{
    console.log("yo");
    console.log(obj);
    //data tags (html hacking)
    const newCategory = obj.id;
    console.log(newCategory, "yo yo yp")
    if(newCategory === categorySelected) return;

    console.log("reached");
    const categoryToSelect  = document.getElementById(newCategory);
    const categoryToUnselect = document.getElementById(categorySelected);
    let categoryItemList = [];
    categoryToSelect.setAttribute("class", "header-button-selected");
    categoryToUnselect.setAttribute("class", "header-button");
    categorySelected= newCategory;


    if(newCategory === categories[0])
    {
        categoryItemList = totalItems;        
    }
    else
    {
        for (const key in totalItems) 
        {
            if(totalItems[key].category == newCategory)
            {
                categoryItemList.push(totalItems[key]);
            }
        }
    }
    console.log(categoryItemList);
    itemsListNode.innerHTML = ""; //todo: fix
    showItemsList(categoryItemList);
}

function showItemsList(categoryItemList) 
{
    console.log(typeof(categoryItemList), categoryItemList);
    categoryItemList.forEach((item) => {
        console.log(item);
        const itemNode = document.createElement("div");

        itemNode.setAttribute("class", "item")

        itemNode.innerHTML = `
        <div class="item-img">
            <img src="Assets/Images/${item.img}" />        
        </div>
        <span class="item-name">${item.name}</span>
        <div id="rating">
        //refactor
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            based on <span> X </span>reviews
        </div>
        <div class = "item-button">
            <button class="add-to-current-order" onclick=addToCurrentOrder("${item.name}")>Add to current order</button>                            
            <button class="order-it" onclick=orderSingleItem("${item.name}")>Order it!</button>
        </div>`
        itemsListNode.appendChild(itemNode)
    });
}


function addToCurrentOrder(itemName) 
{
    if(!currentOrderItems[itemName])
    {
        const item = totalItems[itemName];
        // console.log(item)
        let currentItem = { quantity: 1, name: itemName};
        currentOrderItems[itemName] = currentItem;
        const itemNode = document.createElement("div");
        itemNode.setAttribute("id",`current-order-${itemName}`);
        itemNode.setAttribute("class","ordered-item");
        //remove &#9632;
        itemNode.innerHTML = `
            <span class="currentorder-count">&#9632;</span>
            <span class="currentorder-name">${itemName}</span>
            <div class="quantity-div-ordered">
                <span>Quantity:</span>
                <button class="quantity-plus-minus" onclick=updateQuantity("${itemName}",-1)>-</button>
                <span id="current-quantity-counter-${itemName}">1</span>
                <button class="quantity-plus-minus" onclick=updateQuantity("${itemName}",1)>+</button>
            </div>
            <button class="bt1" onclick=deleteFromCurrentOrder("${itemName}")>Remove</button>
        `;
        currentOrderNode.appendChild(itemNode);
        document.getElementById("current-order-buttons").style.display = "flex";
        document.getElementById("default-current").style.display = "none";
        currentCount++;
        updateCounter("current");
    }
    else 
    {
        alert("item is already in your current order");
    }
}

function updateQuantity(itemName,cnt)
{
    //data
    let currentCount = parseInt(document.getElementById(`current-quantity-counter-${itemName}`).innerText);
    //todo
    if(currentCount===1 && cnt === -1)
    {
        deleteFromCurrentOrder(itemName);
    }
    else
    {
        document.getElementById(`current-quantity-counter-${itemName}`).innerText = currentCount + cnt;
        currentOrderItems[itemName].quantity = currentCount + cnt;
    }
}

function deleteFromCurrentOrder(itemName)
{
    delete currentOrderItems[itemName];
    console.log(currentOrderItems);
    const nodeToDel = document.getElementById(`current-order-${itemName}`);
    currentOrderNode.removeChild(nodeToDel)
    currentCount--;
    updateCounter("current");
    if(currentCount==0)
    {
        document.getElementById("current-order-buttons").style.display = "none";
        document.getElementById("default-current").style.display = "block";
    }
}

function updateCounter(status)
{
    if(status=="pending")
    {
        document.getElementById("pending-counter").innerText = pendingCount;
    }
    else
    {
        document.getElementById("current-counter").innerText = currentCount;        
    }
}

function clearCurrentOrder()
{
    currentOrderItems= [];
    currentOrderNode.innerHTML="";
    currentCount=0;
    document.getElementById("current-order-buttons").style.display = "none";
    document.getElementById("default-current").style.display = "block";
    updateCounter();
}

function showStatusOrders(target)
{
    status.forEach((item) => {
        if(!target.innerText.includes(item))
        {
            document.getElementById(item).setAttribute("class","header-button");
            document.getElementById(`${item}-order-container`).style.display = "none";                       
        }
        else
        {
            document.getElementById(`${item}-order-container`).style.display = "flex";  
            document.getElementById(item).setAttribute("class","header-button-selected");                           
        }
    });
}

function addNewOrder(currentOrderList) {
    if(!currentOrderList)
    {
        currentOrderList = currentOrderItems;
    }
    const order = {
        orderNo: pendingCount+1,
        items: currentOrderList
    }
    addToPendingQueue(order);
    clearCurrentOrder();
}

function addToPendingQueue(order)
{
    pendingOrder.push(order);
    pendingCount++;
    updateCounter("pending");
    if(pendingCount==1)
    {
        //.style 
        document.getElementById("default-pending").style.display = "none";
    }
    console.log("pendingOrder", pendingOrder);
    const orderNode = document.createElement("div");
    //  Object.keys(order.items).map(
    //     (item) => {
    //         console.log(order.items[item].name);
    //  });
    orderNode.setAttribute("id",`pending-order-${order.orderNo}`);
    orderNode.setAttribute("class", "pending-order-items");
    //func
    orderNode.innerHTML=`<span class="p1">${order.orderNo}</span>
                            <div class="pending-single-order-items">
                                ${Object.keys(order.items).map(
                                    (item) => {
                                        return `<span>${order.items[item].name}</span>`
                                }).join("")}
                            </div>
                            <div class="pending-single-order-quantities">
                                ${Object.keys(order.items).map(
                                    (item) => {
                                        return `<span>${order.items[item].quantity}</span>`
                                }).join("")}
                            </div>
                            <button class="p6" onclick=deletePendingOrderPreprocess(${order.orderNo})>cancel</button>`;
    pendingListNode.appendChild(orderNode);
}

function orderSingleItem(itemName) 
{
    let currentItem = { quantity: 1, name: itemName};
    let currentItems = [];
    currentItems[itemName] = currentItem;
    const order = {
        orderNo: pendingCount+1,
        items: currentItems
    }
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    addToPendingQueue(order);
}

function deletePendingOrderPreprocess(orderNo)
{
    for(let i=orderNo-1; i<pendingOrder.length-1; i++)
    {
        pendingOrder[i].items = pendingOrder[i+1].items;
    }
    pendingOrder.pop();
    pendingCount--;
    pendingListNode.innerHTML = "";
    updateCounter("pending"); 
    if(pendingCount == 0)
    {
        document.getElementById("default-pending").style.display = "block";
        return;
    }  
    showPendingOrder();
}
function showPendingOrder()
{
    //todo: common code
    pendingOrder.forEach((item) => {
        console.log(item);
        const orderNode = document.createElement("div");
    //  Object.keys(order.items).map(
    //     (item) => {
    //         console.log(order.items[item].name);
    //  });
        orderNode.setAttribute("id",`pending-order-${item.orderNo}`);
        orderNode.setAttribute("class", "pending-order-items");
        orderNode.innerHTML=`<span class="p1">${item.orderNo}</span>
                                <div class="pending-single-order-items">
                                    ${Object.keys(item.items).map(
                                        (itm) => {
                                            return `<span>${item.items[itm].name}</span>`
                                    }).join("")}
                                </div>
                                <div class="pending-single-order-quantities">
                                    ${Object.keys(item.items).map(
                                        (itm) => {
                                            return `<span>${item.items[itm].quantity}</span>`
                                    }).join("")}
                                </div>
                                <button class="p6" onclick=deletePendingOrderPreprocess(${item.orderNo})>cancel</button>`;
        pendingListNode.appendChild(orderNode);
    });
}