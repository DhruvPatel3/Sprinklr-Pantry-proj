let adminJsNameSpace = (function(){
    const tabConstants = {
        ORDERS: "Orders",
        REVIEWS: "Reviews"
    };
    const data = {
        currentTab: "",
        lastSelectedTab: "",
    };
    const controller = {
        init: function()
        {
            data.currentTab = tabConstants.ORDERS;
            tabBarView.init(data.currentTab);
        },
        setCurrentTab: function(tab)
        {
            if(data.currentTab === tab)
            {
                return;
            }
            data.lastSelectedTab = data.currentTab;
            data.currentTab = tab;
            tabBarView.render(data.lastSelectedTab, data.currentTab);
        }
    };
    const tabBarView = {
        init: function(currentTab)
        {
            this.tabViewNode = document.getElementById('lower-header-status');
            const tempNode = document.createDocumentFragment();
            Object.keys(tabConstants).forEach((tab) => {
                const tabNode = document.createElement("button");
                //console.log(categoryConstants[category]);
                tabNode.setAttribute("id",tabConstants[tab]);
                const state = (tabConstants[tab] === currentTab)?"-selected":"";
                tabNode.setAttribute("class", `header-button${state}`);
                tabNode.innerHTML = `${tabConstants[tab]}(<span id="${tabConstants[tab]}-count" data-count="0">0</span>)`;
                tabNode.addEventListener('click',(function(tabCopy){
                    return function()
                    {
                        controller.setCurrentTab(tabCopy);
                    }
                })(tabConstants[tab]));
                tempNode.appendChild(tabNode);
            });
            this.tabViewNode.appendChild(tempNode);
        },
        render: function(lastSelected, selected)
        {
            const tabToSelect = document.getElementById(selected);
            const tabToUnselect = document.getElementById(lastSelected);
            tabToSelect.setAttribute("class", "header-button-selected");
            tabToUnselect.setAttribute("class", "header-button");
        }
    };
    const ordersView = {
        init: function()
        {
            this.ordersContainer = getElementById("ordersList");
            this.ordersNode = getElementById("orders");
        },
        render: function(order)
        {
            const order = documnet.createElement("div");
            order.setAttribute("id","order-" + order.id);
            order.setAttribute("class","users");
            order.innerHTML = `
                            <div class="p0"></div>
                            <div class="p2">
                                    <img id="listimg" src="Assets/Images/${order.userImage}.png">
                                    <span>${order.userName}</span>
                            </div>
                            <div class="p1">
                                <span>${order.time}</span>
                            </div>
                            <div class="p3">
                                <span>${order.table}</span>                                
                            </div>
                            <div class="p4">
                                ${order.items.map(
                                    (item) => {
                                        return `<span>${item.name}</span>`
                                }).join("")}
                            </div>
                            <div class="p5">
                                ${order.items.map(
                                    (item) => {
                                        return `<span>${item.quantity}</span>`
                                }).join("")}
                            </div>
                            <div class="p6">
                                <button class="bt1">
                                    Done
                                </button>
                            </div>   `;
            order.getElementByClassName("p6")[0].addEventListener("click",(function(){
                return function()
                {

                }
            })());
            this.ordersNode.appendChild(order);

        }
    };
    controller.init();
})();