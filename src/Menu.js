import React, { Component } from 'react'

class Menu extends Component {
    render() {
        let menus = ['Home', 'About', 'Services', 'Portfolio', 'Contact']

        return (
            <div>
                {menus.map((menu, i) => {
                    return <div key={i}><Link label={menu} /></div>
                })}
            </div>
        )
    }
}

class Link extends Component {
    render() {
        const url = '/' + this.props.label.toLowerCase().replace(' ', '-')
        return (
            <div>
                <a href={url}>{this.props.label}</a>
            </div>
        )
    }
}

export default Menu
