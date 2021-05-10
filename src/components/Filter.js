import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          Order{" "}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select value={this.props.size} onChange={this.props.filterProducts}>
            <option value="">ALL</option>
            <option value="Fire Cracker Prawn">Fire Cracker Prawn</option>
            <option value="Mutton Xacuti">Mutton Xacuti</option>
            <option value="Pakora Platter">Pakora Platter</option>
            <option value="Beef Chilli Fry">Beef Chilli Fry</option>
            <option value="Burnt Garlic Noodles">Burnt Garlic Noodles</option>
            <option value="Virgin Pinacolada">Virgin Pinacolada</option>
          </select>
        </div>
      </div>
    );
  }
}
