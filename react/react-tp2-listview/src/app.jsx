const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

var categories = []

products.forEach(function (o) {
    if (!categories.includes(o.category)) {
        categories.push(o.category)
    }
});

class FilterableProductTable extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            search: '',
            onlyStock: false
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    handleSearchChange (e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    render () {
        return <div>
            {JSON.stringify(this.state)}
            <SearchBar search={this.state.search} onlyStock={this.state.onlyStock} onSearchChange={this.handleSearchChange}/>
            <ProductTable search={this.state.search} onlyStock={this.state.onlyStock}/>
        </div>

    }
}

class SearchBar extends React.Component {
    
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.props.onSearchChange(e)
    }

    render () {
        return <form className="form-group">
            <input type="text" value={this.props.search} onChange={this.handleChange} name="search" id="search" placeholder="Search..." className="form-control" />
            <input type="checkbox" checked={this.props.onlyStock} onChange={this.handleChange} name="onlyStock" id="onlyStock" className="form-check-input" />
            <label htmlFor="onlyStock" className="form-check-label">Only show products in stock</label>
        </form>
    }
}

function ProductTable ({search, onlyStock}) {
    
    const list = []
    categories.forEach(category => {
        products.filter(product => 
            product.category == category &&
            product.name.toLowerCase().includes(search.toLowerCase())
            && (product.stocked || !onlyStock))
            .forEach((product, i) => {
                if(i === 0) list.push(<ProductCategoryRow key={category} category={category} />)
                list.push(<ProductRow key={product.name} product={product} />)
        })
    })
    
    return <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
    </table>

}

class ProductCategoryRow extends React.Component {
    
    constructor(props){
        super(props)
    }

    render () {
        return <tr>
            <th className="">{this.props.category}</th>
        </tr>
    }
}

class ProductRow extends React.Component {
    
    constructor(props){
        super(props)
    }

    render () {
        return <tr>
            <td className={this.props.product.stocked ? null : "text-danger"}>{this.props.product.name}</td>
            <td>{this.props.product.price}</td>
        </tr>
    }
}

ReactDOM.render(<FilterableProductTable/>, document.querySelector('#app'))