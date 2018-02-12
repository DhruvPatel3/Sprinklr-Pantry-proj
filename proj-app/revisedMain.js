var mainJsNameSpace = (function(window){
    const categoryConstants = 
    {
        ALL: 'All',
        BEVERAGES: 'Beverages',
        FRUITS: 'Fruits',
        SNACKS: 'Snacks'
    }
    const statusConstants = 
    {
        CART: 'Cart',
        PENDING: 'Pending',
        COMPLETED: 'Completed'
    }
    const data = 
    {
        currentCategory: '',
        selectedStatus: '',
        lastSelectedStatus: '',
        prevCategory: '',
        pendingCount: 0,
        userName: "Dhruv",
        userImage: "11.jpg",
        tableNo: 9,
        items:[
        {
            id: 1,
            name: 'Apple',
            img: 'apple.jpg',
            category: categoryConstants.FRUITS,
        },
        {
            id: 2,
            name: 'Tea',
            img: 'tea.jpg',
            category: categoryConstants.BEVERAGES,
        },
        {
            id: 3,
            name: 'Coffee',
            img: 'coffee.jpg',
            category: categoryConstants.BEVERAGES,
        },
        {
            id: 4,
            name: 'Maggi',
            img: 'maggi.jpg',
            category: categoryConstants.SNACKS,
        },
        {
            id: 4,
            name: 'Maggi',
            img: 'maggi.jpg',
            category: categoryConstants.SNACKS,
        },
        {
            id: 4,
            name: 'Maggi',
            img: 'maggi.jpg',
            category: categoryConstants.SNACKS,
        },
        {
            id: 4,
            name: 'Maggi',
            img: 'maggi.jpg',
            category: categoryConstants.SNACKS,
        },
        {
            id: 4,
            name: 'Maggi',
            img: 'maggi.jpg',
            category: categoryConstants.SNACKS,
        },
      ],
      cartOrders:[

      ],
      pendingOrders:[

      ],
      completedOrders:[

      ]
    };

    const controller = {
        
        init: function()
        {
            data.prevCategory = categoryConstants.ALL;
            data.currentCategory = categoryConstants.ALL;
            data.selectedStatus = statusConstants.CART;
            data.lastSelectedStatus = statusConstants.CART;
            categoryView.init(data.currentCategory);
            statusBarView.init(data.selectedStatus);
            itemsView.init();
            cartView.init();
            pendingView.init();
            completedView.init();
            statusView.init();
            this.restoreFromStorage();
            //cartView.render(1,0,1,{id:1,name:"apple",quantity:1});
            //statusBarView.renderUpdatedCount(statusConstants.CART);
        },
        restoreFromStorage: function()
        {
            
        },
        updateStorage: function(tab)
        {
            if(tab === statusConstants.CART)
            {
                localStorage.setItem("cartOrders",JSON.stringify(data.cartOrders));
            }
            else if(tab === statusConstants.PENDING)
            {
                localStorage.setItem("pendingOrders",JSON.stringify(data.pendingOrders));
            }
            else if(tab === statusConstants.COMPLETED)
            {
                localStorage.setItem("completedOrders",JSON.stringify(data.completedOrders));
            }
        },
        setCurrentCategory: function(category)
        {
            if(data.currentCategory === category)
            {
                return;
            }
            data.prevCategory = data.currentCategory;
            data.currentCategory = category;
            categoryView.render(data.prevCategory, data.currentCategory);
            itemsView.render();
        },
        setSelectedStatus: function(status)
        {
            if(data.selectedStatus === status)
            {
                return;
            }
            data.lastSelectedStatus = data.selectedStatus;
            data.selectedStatus = status;
            statusBarView.render(data.lastSelectedStatus, data.selectedStatus);
            statusView.render(status, data.lastSelectedStatus);
        },
        getItemsToRender: function()
        {
            if(data.currentCategory === categoryConstants.ALL)
            {
                return data.items;
            }
            else
            {
                return data.items.filter((item) => {
                    return item.category === data.currentCategory;
                });
            }
        },
        addToCart: function(itemId)
        {
            const itemExists = data.cartOrders.findIndex((item) => {return item.id === itemId});
            if(itemExists !== -1)
            {
                this.updateQuantityOfItem(itemId,true);
            }
            else
            {
                let item = data.items.find((item) => {return item.id === itemId});
                let cartElement = {
                    id: itemId,
                    name: item.name,
                    quantity: 1,
                }
                const defaultViewFlag = data.cartOrders.length === 0? true : false;
                data.cartOrders.push(cartElement);
                statusBarView.renderUpdatedCount(statusConstants.CART,data.cartOrders.length);
                cartView.render(true, cartElement, defaultViewFlag, false);
            }
            this.updateStorage(statusConstants.CART);
        },
        removeFromCart: function(itemId)
        {
            data.cartOrders.splice(data.cartOrders.findIndex((item)=> {return item.id === itemId}),1);
            statusBarView.renderUpdatedCount(statusConstants.CART,data.cartOrders.length);
            const defaultViewFlag = data.cartOrders.length === 0? true : false;
            cartView.render(false, itemId, defaultViewFlag, true);
            this.updateStorage(statusConstants.CART);
        },
        updateQuantityOfItem: function(itemId, increement)
        {
            const itemIndex = data.cartOrders.findIndex((item) => {return item.id === itemId});
            console.log(itemIndex + " this");
            
            const updatedQuantity = increement ? (++data.cartOrders[itemIndex].quantity) : (--data.cartOrders[itemIndex].quantity);
            console.log(updatedQuantity + " q " + data.cartOrders[itemIndex].quantity);

            if(!updatedQuantity)
            {
                const defaultViewFlag = data.cartOrders.length === 0? true : false;
                this.removeFromCart(itemId);
            }
            else
            {
                cartView.renderUpdatedQuantity(itemId,updatedQuantity);
            }
            this.updateStorage(statusConstants.CART);
        },
        clearCart: function()
        {
            data.cartOrders = [];
            statusBarView.renderUpdatedCount(statusConstants.CART,data.cartOrders.length);
            cartView.emptyCart();
            this.updateStorage(statusConstants.CART);
        },
        addQuickOrder: function(itemId)
        {
            const itemIndex = data.items.findIndex((item)=> {return item.id === itemId});
            const order = {
                id: data.pendingCount++,
                userName: data.userName,
                userImage: data.userImage,
                table: data.tableNo,
                items: [{
                    id: itemId,
                    name: data.items[itemIndex].name,
                    quantity: 1
                }],
                time: new Date().toLocaleTimeString()
            };
            console.log(order.items, "yo");
            const defaultViewFlag = data.pendingOrders.length === 0 ? true: false;
            data.pendingOrders.push(order);
            pendingView.render(true, order, defaultViewFlag, false);
            statusBarView.renderUpdatedCount(statusConstants.PENDING, data.pendingOrders.length);
            this.updateStorage(statusConstants.PENDING);
        },
        addToPendingOrders: function()
        {
            const order = {
                id: data.pendingCount++,
                userName: data.userName,
                userImage: data.userImage,
                table: data.tableNo,
                items: data.cartOrders,
                time: new Date().toLocaleTimeString()
            };
            console.log("yo haha");
            const defaultViewFlag = data.pendingOrders.length === 0 ? true: false;
            data.pendingOrders.push(order);
            pendingView.render(true, order, defaultViewFlag, false);
            statusBarView.renderUpdatedCount(statusConstants.PENDING,data.pendingOrders.length);
            this.clearCart();
            this.updateStorage(statusConstants.PENDING);            
        },
        deletePendingOrder: function(orderId)
        {
            data.pendingOrders.splice(data.pendingOrders.findIndex((order) => {return order.id === orderId}),1);
            statusBarView.renderUpdatedCount(statusConstants.PENDING,data.pendingOrders.length);
            const defaultViewFlag = data.pendingOrders.length === 0? true : false;
            pendingView.render(false, orderId, defaultViewFlag, true);
            this.updateStorage(statusConstants.PENDING);            
        },
        deleteAllPendingOrders: function()
        {
            data.pendingOrders = [];
            statusBarView.renderUpdatedCount(statusConstants.PENDING,data.pendingOrders.length);
            pendingView.emptyOrders();
            this.updateStorage(statusConstants.PENDING);            
        }
    };

    const categoryView = {

        init: function(categorySelected)
        {
            this.categoriesList = document.getElementById("lower-header-items");
            const tempNode = document.createDocumentFragment();
            Object.keys(categoryConstants).forEach((category) => {
                const categoryNode = document.createElement("button");
                //console.log(categoryConstants[category]);
                categoryNode.setAttribute("id",categoryConstants[category]);
                const state = (categoryConstants[category] === categorySelected)?"-selected":"";
                categoryNode.setAttribute("class", `header-button${state}`);
                categoryNode.innerHTML = `${categoryConstants[category]}`;
                categoryNode.addEventListener('click',(function(categoryCopy){
                    return function()
                    {
                        controller.setCurrentCategory(categoryCopy);
                    }
                })(categoryConstants[category]));
                tempNode.appendChild(categoryNode);
            });
            this.categoriesList.appendChild(tempNode);
        },
        render: function(prevCategory, currentCategory)
        {
            categoryToSelect = document.getElementById(currentCategory);
            categoryToUnselect = document.getElementById(prevCategory);
            categoryToSelect.setAttribute("class", "header-button-selected");
            categoryToUnselect.setAttribute("class", "header-button");
        }
    };

    const statusBarView = {
        init: function(selectedStatus)
        {
            this.statusBar = document.getElementById('lower-header-status');
            const tempNode = document.createDocumentFragment();
            Object.keys(statusConstants).forEach((status) => {
                const statusNode = document.createElement("button");
                //console.log(categoryConstants[category]);
                statusNode.setAttribute("id",statusConstants[status]);
                const state = (statusConstants[status] === selectedStatus)?"-selected":"";
                statusNode.setAttribute("class", `header-button${state}`);
                statusNode.innerHTML = `${statusConstants[status]}(<span id="${statusConstants[status]}-count" data-count="0">0</span>)`;
                statusNode.addEventListener('click',(function(statusCopy){
                    return function()
                    {
                        controller.setSelectedStatus(statusCopy);
                    }
                })(statusConstants[status]));
                tempNode.appendChild(statusNode);
            });
            this.statusBar.appendChild(tempNode);
        },
        render: function(lastSelected, selected)
        {
            const statusToSelect = document.getElementById(selected);
            const statusToUnselect = document.getElementById(lastSelected);
            statusToSelect.setAttribute("class", "header-button-selected");
            statusToUnselect.setAttribute("class", "header-button");
        },
        renderUpdatedCount: function(status, count)
        {
            const statusNode = document.getElementById(status+"-count");
            statusNode.innerHTML = count;
        }
    };

    const statusView = {
        init: function()
        {
            document.getElementById("Pending-order-container-id").classList.add("display-none");
            document.getElementById("Completed-order-container-id").classList.add("display-none");
        },
        render: function(newlySelectedStatus, prevSelectedStatus)
        {
            document.getElementById(newlySelectedStatus+"-order-container-id").classList.remove("display-none");
            document.getElementById(prevSelectedStatus+"-order-container-id").classList.add("display-none");
        }
    };

    const itemsView = {
        init: function(listData)
        {
            this.itemsList = document.getElementById("menu");
            this.render();
        },
        render: function()
        {
            this.itemsList.innerHTML = "";
            const tempNode = document.createDocumentFragment();            
            const itemsToRender = controller.getItemsToRender();
            console.log(itemsToRender);
            itemsToRender.forEach((item) => {
                const itemNode = document.createElement("div");
                itemNode.setAttribute("class", "item");

                itemNode.innerHTML = `
                <div class="item-img">
                    <img src="Assets/Images/${item.img}" />        
                </div>
                <span class="item-name">${item.name}</span>
                <div id="rating">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    based on <span> X </span>reviews
                </div>
                <div class = "item-button">
                    <button class="add-to-current-order">Add to cart</button>                            
                    <button class="order-it">Order it!</button>
                </div>`;
                itemNode.getElementsByClassName('add-to-current-order')[0].addEventListener('click',(function(itemId){
                    return function()
                    {
                        controller.addToCart(itemId);
                    }
                })(item.id));
                itemNode.getElementsByClassName('order-it')[0].addEventListener('click',(function(itemId){
                    return function()
                    {
                        controller.addQuickOrder(itemId);
                    }
                })(item.id));
                tempNode.appendChild(itemNode);
            });
            this.itemsList.appendChild(tempNode);
        }
    };

    const cartView = {
        init: function()
        {
            this.cartContainer = document.getElementById("Cart-order-container-id");
            this.cartOrdersNode = document.getElementById("current-ordered");
            const cartButtons = document.createElement("div");
            cartButtons.setAttribute("id","current-order-buttons");
            cartButtons.setAttribute("class","display-none");
            cartButtons.innerHTML = `
                <button class="add-to-current-order" >Cancel</button>                            
                <button class="order-it"">Place order</button>`;
            cartButtons.getElementsByClassName("add-to-current-order")[0].addEventListener('click', function(){
                if(confirm("Are you sure you want to remove all items?"))
                {
                    controller.clearCart();
                }
            });
            cartButtons.getElementsByClassName("order-it")[0].addEventListener('click',function(){
                    controller.addToPendingOrders();
            });
            const defaultCartView = document.createElement("div");
            defaultCartView.setAttribute("id","default-current");
            defaultCartView.setAttribute("class","default-view");
            defaultCartView.innerHTML = `Your cart is empty!`;
            this.cartContainer.appendChild(defaultCartView);
            this.cartContainer.appendChild(cartButtons);
            console.log(this.cartOrdersNode + "yo");
        },
        render: function(addFlag, item, defaultFlag, removeFlag)
        {
            if(addFlag)
            {
                if(defaultFlag)
                {
                    this.updateDefaultView(!defaultFlag);
                }
                const itemNode = document.createElement("div");
                itemNode.setAttribute("id",`current-order-${item.id}`);
                itemNode.setAttribute("class","ordered-item");
                //remove &#9632;
                itemNode.innerHTML = `
                    <span class="currentorder-name">${item.name}</span>
                    <div class="quantity-div-ordered">
                        <span>Quantity:</span>
                        <button class="quantity-minus" >-</button>
                        <span id="quantity-div-ordered-${item.id}" class="current-quantity-counter" >1</span>
                        <button class="quantity-plus" >+</button>
                    </div>
                    <button class="bt1">Remove</button>
                `;
                itemNode.getElementsByClassName("bt1")[0].addEventListener('click', (function(itemIdCopy){
                    return function()
                    {
                        controller.removeFromCart(itemIdCopy);
                    }
                })(item.id));

                itemNode.getElementsByClassName("quantity-minus")[0].addEventListener('click', (function(itemIdCopy){
                    return function()
                    {
                        controller.updateQuantityOfItem(itemIdCopy,false);
                    }
                })(item.id));
                itemNode.getElementsByClassName("quantity-plus")[0].addEventListener('click', (function(itemIdCopy){
                    return function()
                    {
                        controller.updateQuantityOfItem(itemIdCopy,true);
                    }
                })(item.id));
                this.cartOrdersNode.appendChild(itemNode);
                var x = document.getElementById("snackbar")
                x.className = "show";
                x.innerHTML = "item is added to your cart!"
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
            else if(removeFlag)
            {
                this.cartOrdersNode.removeChild(document.getElementById("current-order-" + item));
                if(defaultFlag)
                {
                    this.updateDefaultView(defaultFlag);
                }
            }
        },
        renderUpdatedQuantity: function(itemId, updatedQuantity)
        {
            document.getElementById("quantity-div-ordered-" + itemId).innerHTML = updatedQuantity;
        },
        emptyCart: function()
        {
            this.cartOrdersNode.innerHTML = ``;
            this.updateDefaultView(true);
        },
        updateDefaultView: function(defaultFlag)
        {
            if(defaultFlag)
            {
                document.getElementById("default-current").classList.remove("display-none");                    
                document.getElementById("default-current").classList.add("default-view");
                document.getElementById("current-order-buttons").classList.remove("current-order-buttons-class");
                document.getElementById("current-order-buttons").classList.add("display-none");                
            }
            else
            {
                document.getElementById("default-current").classList.remove("default-view");                    
                document.getElementById("default-current").classList.add("display-none");
                document.getElementById("current-order-buttons").classList.remove("display-none");
                document.getElementById("current-order-buttons").classList.add("current-order-buttons-class");                
            }
        }
    };
    const pendingView = {
        init: function()
        {
            this.pendingOrdersNode = document.getElementById("pending-orders");
            this.pendingContainer = document.getElementById("Pending-order-container-id");
            //document.getElementById("pending-order-paralist-id").classList.add("display-none");  
            
            const pendingButton = document.createElement("div");
            pendingButton.setAttribute("id","pending-button");
            pendingButton.setAttribute("class","display-none");
            pendingButton.innerHTML = `<button class="add-to-current-order">Cancel All Orders</button>`;
            pendingButton.addEventListener('click',function(){
                if(confirm("are you sure you want to cancel all your pending orders?"))
                {
                    controller.deleteAllPendingOrders();
                }
            });
            const defaultPendingView = document.createElement("div");
            defaultPendingView.setAttribute("id","default-pending");
            defaultPendingView.setAttribute("class","default-view");
            defaultPendingView.innerHTML = `You have no pending orders!`;
            this.pendingContainer.appendChild(defaultPendingView);
            this.pendingContainer.appendChild(pendingButton);
            console.log(this.cartOrdersNode + "yo");
        },
        render: function(addFlag, order, defaultFlag, removeFlag)
        {
            if(addFlag)
            {
                if(defaultFlag)
                {
                    this.updateDefaultView(!defaultFlag);
                }
                const orderNode = document.createElement("div");
                orderNode.setAttribute("id",`pending-order-${order.id}`);
                orderNode.setAttribute("class", "pending-order-items");
                //func
                orderNode.innerHTML=`
                                        <div class="pending-single-order-items">
                                            ${order.items.map(
                                                (item) => {
                                                    return `<span>${item.name}</span>`
                                            }).join("")}
                                        </div>
                                        <div class="pending-single-order-quantities">
                                            ${order.items.map(
                                                (item) => {
                                                    return `<span>${item.quantity}</span>`
                                            }).join("")}
                                        </div>
                                        <span class="p1">${order.time}</span>
                                        <button class="p6">cancel</button>`;
                orderNode.getElementsByClassName("p6")[0].addEventListener('click',(function(orderIdCopy){
                    return function()
                    {
                        if(confirm("Are you sure you want to cancel this order?"))
                        {
                            controller.deletePendingOrder(orderIdCopy);
                        }
                    }
                })(order.id));
                this.pendingOrdersNode.appendChild(orderNode);
                var x = document.getElementById("snackbar")
                x.className = "show";
                x.innerHTML = "your order is placed!";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
            else if(removeFlag)
            {
                this.pendingOrdersNode.removeChild(document.getElementById("pending-order-" + order));
                if(defaultFlag)
                {
                    this.updateDefaultView(defaultFlag);
                }
            }
        },
        emptyOrders: function()
        {
            this.pendingOrdersNode.innerHTML = ``;
            this.updateDefaultView(true);
        },
        updateDefaultView: function(defaultFlag)
        {
            if(defaultFlag)
            {
                //document.getElementById("pending-order-paralist-id").classList.add("display-none");                              
                document.getElementById("default-pending").classList.remove("display-none");                    
                document.getElementById("default-pending").classList.add("default-view");
                document.getElementById("pending-button").classList.remove("current-order-buttons-class");
                document.getElementById("pending-button").classList.add("display-none");
            }
            else
            {
                //document.getElementById("pending-order-paralist-id").classList.remove("display-none");                              
                document.getElementById("default-pending").classList.remove("default-view");                    
                document.getElementById("default-pending").classList.add("display-none");
                document.getElementById("pending-button").classList.remove("display-none");
                document.getElementById("pending-button").classList.add("current-order-buttons-class");
            }
        }
    };
    const completedView = {
        init: function()
        {
            this.completedContainer = document.getElementById("Completed-order-container-id");
        
            const completedButton = document.createElement("div");
            completedButton.setAttribute("id","completed-button");
            completedButton.setAttribute("class","display-none");
            completedButton.innerHTML = `<button class="bt1" >Clear All</button>`;

            const defaultCompletedView = document.createElement("div");
            defaultCompletedView.setAttribute("id","default-completed");
            defaultCompletedView.setAttribute("class","default-view");
            defaultCompletedView.innerHTML = `None of your orders has been dilivered!`;
            this.completedContainer.appendChild(defaultCompletedView);
            this.completedContainer.appendChild(completedButton);
        },
        render: function()
        {
            
        }
    };
    controller.init();
})(this);