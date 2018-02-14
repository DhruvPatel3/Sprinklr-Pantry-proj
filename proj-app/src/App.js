import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getCities from './cities'


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
class App extends Component 
{
	constructor(props)
	{
		super(props);
		this.state = {
			currentCategory: categoryConstants.ALL,
			currentStatus: statusConstants.CART,
			data: {
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
					id: 6,
					name: 'Maggi',
					img: 'maggi.jpg',
					category: categoryConstants.SNACKS,
				},
				{
					id: 5,
					name: 'Maggi',
					img: 'maggi.jpg',
					category: categoryConstants.SNACKS,
				},
				{
					id: 7,
					name: 'Maggi',
					img: 'maggi.jpg',
					category: categoryConstants.SNACKS,
				},
				{
					id: 8,
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
			}
		}
		this.onCategoryChange = this.onCategoryChange.bind(this);
		this.onStatusViewChange = this.onStatusViewChange.bind(this);
		this.onDataChange = this.onDataChange.bind(this);
	}
	onCategoryChange(category)
	{
		let x = getCities();
		console.log("hdhd",x);
		x.then(() => {
			console.log("bro");
		})
		this.setState(()=>({
			currentCategory: category
		}));
	}
	onStatusViewChange(status)
	{
		this.setState(()=>({
			currentStatus: status
		}));
	}
	updateQuantityOfItem(itemId,increement)
	{
		const tempState = this.state;
		const itemIndex = tempState.data.cartOrders.findIndex((item) => {return item.id === itemId});
		console.log(itemIndex + " this");
		const updatedQuantity = increement ? (++tempState.data.cartOrders[itemIndex].quantity) : (--tempState.data.cartOrders[itemIndex].quantity);
		if(updatedQuantity === 0)
		{
			this.deleteItemFromCart(itemId);
		}
		else
		{
			this.setState(() => {
				return {
					data: tempState.data
				};
			});
		}
	}
	deleteItemFromCart(itemId)
	{
		this.setState((prevState, props) => {
			const tempState = prevState;
			tempState.data.cartOrders.splice(tempState.data.cartOrders.findIndex((item)=> {return item.id === itemId}),1);
			return {
				data: tempState.data
			};
		})	
	}
	addItemToCart(itemId)
	{
		const tempState = this.state;
		console.log("YO");
		const itemExists = tempState.data.cartOrders.findIndex((item) => {return item.id === itemId});
		if(itemExists !== -1)
		{
			this.updateQuantityOfItem(itemId,true);
		}
		else
		{
			this.setState((prevState,props) => {
				let item = tempState.data.items.find((item) => {return item.id === itemId});
				let cartElement = {
					id: itemId,
					name: item.name,
					quantity: 1,
				}
				console.log(cartElement, "cart Element");
				tempState.data.cartOrders.push(cartElement);
				console.log(tempState.data.cartOrders, "this one");
				return {
				data: tempState.data 
			}});
		}
	}
	onDataChange(argObj)
	{
		if(argObj.type === statusConstants.CART)
		{
			if(argObj.addFlag)
			{
				this.addItemToCart(argObj.id);	
			}
			else if(argObj.updateFlag)
			{
				this.updateQuantityOfItem(argObj.id, argObj.increement);
			}
			else if(argObj.deleteFlag)
			{
				this.deleteItemFromCart(argObj.id);
			}
		}
		console.log(this.state);
	}
	render() 
	{
		const currCategory = this.state.currentCategory;
		const currStatus = this.state.currentStatus; 
		const data = this.state.data;
		return [
			<Header onCategoryChange = {this.onCategoryChange} onStatusChange={this.onStatusViewChange} 
				category = {currCategory} status = {currStatus} data={data} />,
			<MainContainer category = {currCategory} status = {currStatus} data={data} onChange={this.onDataChange}/>
		];
	}
}
class Header extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return (
			<header>
				<UpperHeader />
				<LowerHeader handlers ={this.props} />				
			</header>
		);
	}
}
class UpperHeader extends Component
{
	render()
	{
		return (
			<div id="upper-header">
                <img id="logo" src="Assets/Images/1.png" />            
                <span id="header-title">Sprinklr Pantry</span> 
                <div id="user-img"></div>
            </div>
		);
	}
}

class LowerHeader extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return(
			<div id = "lower-header">
				<NavBar currentValue={this.props.handlers.category} 
						onChange={this.props.handlers.onCategoryChange}
						categoryFlag={true}/>
				<NavBar currentValue={this.props.handlers.status}
				        onChange={this.props.handlers.onStatusChange}
						categoryFlag={false}
						data={this.props.handlers.data}/>
			</div>
		);
	}
}

class NavBar extends Component
{
	constructor(props)
	{
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.constants = this.props.categoryFlag? categoryConstants : statusConstants;
	}
	handleChange(category)
	{
		console.log(category);
		this.props.onChange(category);
	}
	render()
	{
		console.log("hfhfhf")
		const elementId = this.props.categoryFlag? "lower-header-items" : "lower-header-status";
		return(
			<div id = {elementId}>
				{Object.keys(this.constants).map((category) => {
					return <button key={this.constants[category]} id={this.constants[category]} 
								className = {`header-button${(this.constants[category] === this.props.currentValue)?"-selected":""}`} 
								onClick={()=>(this.handleChange(this.constants[category]))} >
					{this.constants[category]}{!this.props.categoryFlag &&
						 <span>(<span id="${constants[category]}-count">{this.props.data[this.constants[category].toLowerCase() + "Orders"].length}</span>)</span>}
					</button>;
				})}
			</div>
		);
	}
}

class MainContainer extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return (
			<div id="container">
				<ItemsView category={this.props.category} data={this.props.data} onChange={this.props.onChange}/>
				<OrdersView status={this.props.status} data={this.props.data} onChange={this.props.onChange}/>
			</div>	
		);
	}
}

class ItemsView extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return (
			<div id="items">
				<div id="menu">
					<ItemsList category={this.props.category} data={this.props.data} onChange={this.props.onChange}/>
				</div>
			</div>	
		);
	}
}
class ItemsList extends Component
{
	constructor(props)
	{
		super(props);
	}
	getItemsToRender()
	{
		if(this.props.category === categoryConstants.ALL)
		{
			return this.props.data.items;
		}
		else
		{
			return this.props.data.items.filter((item) => {
				return item.category === this.props.category;
			});
		}
	}
	render()
	{
		const itemsToRender = this.getItemsToRender();
		return itemsToRender.map((item) => {
				return <ItemTemplate key={item.id} itemInfo={item} onChange={this.props.onChange}/>
		});
	}
}
class ItemTemplate extends Component
{
	constructor(props)
	{
		super(props);
	}
	addToCart(itemId)
	{
		this.props.onChange({id: itemId, addFlag: true, type:statusConstants.CART});
	}
	quickOrder()
	{

	}
	render()
	{
		const item = this.props.itemInfo;
		return(
			<div className="item">
				<div className="item-img">
                    <img src={`Assets/Images/${item.img}`} />        
                </div>
                <span className="item-name">{item.name}</span>
                <div id="rating">
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    based on <span> X </span>reviews
                </div>
                <div className = "item-button">
                    <button className="add-to-current-order" onClick={()=>{this.addToCart(item.id)}}>Add to cart</button>                            
                    <button className="order-it">Order it!</button>
                </div>
			</div>
		); 
	}
}

class OrdersView extends Component
{
	constructor(props)
	{
		super(props);
	}
	getContainer()
	{
		if(this.props.status === statusConstants.CART)
		{
			return <CartView />;
		}
		else if(this.props.status === statusConstants.PENDING)
		{
			//return <PendingView />;
		}
		else if(this.props.status === statusConstants.COMPLETED)
		{
			//return <CompletedView />;
		}
	}
	render()
	{
		return(
			<div id="orders">
				<CartView data={this.props.data} onChange={this.props.onChange}/>
			</div>
		);
	}
}
class CartView extends Component
{
	constructor(props)
	{
		super(props);
	}
	getDivToRender(defaultFlag)
	{
		console.log("yo");
		if(defaultFlag)
		{
			return (
			<div id = "Cart-order-container-id" className="Current-order-container"> 
				<div className="default-view">Your cart is empty!</div>
			</div>);
		} 
		else
		{
			return (<div id = "Cart-order-container-id" className="Current-order-container" >
					<div id = "current-ordered">
						<CartOrderList data={this.props.data} onChange={this.props.onChange}/>
					</div>
					<div id = "current-order-buttons">
						<button class="add-to-current-order" >Cancel</button>                            
						<button class="order-it">Place order</button>
					</div>
		</div>);
		}
	}
	render()
	{
		return this.getDivToRender(!this.props.data.cartOrders.length);
	}
}

class CartOrderList extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		return this.props.data.cartOrders.map((order)=>{
			return <CartOrderTemplate key={order.id} orderInfo = {order} onChange={this.props.onChange}/>
		});
	}
}

class CartOrderTemplate extends Component
{
	constructor(props)
	{
		super(props);
	}
	render()
	{
		const item = this.props.orderInfo;
		return (
			<div id={`current-order-${item.id}`} className={"ordered-item"}>
				<span className="currentorder-name">{item.name}</span>
				<div className="quantity-div-ordered">
					<span>Quantity:</span>
					<button className="quantity-minus" >-</button>
					<span id={`quantity-div-ordered-${item.id}`} className="current-quantity-counter" >{item.quantity}</span>
					<button className="quantity-plus" >+</button>
				</div>
				<button className="bt1" >Remove</button>
			</div>
		);
	}
}
export default App;
