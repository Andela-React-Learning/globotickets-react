import React, { Component } from "react"
import faker from "faker"

import { Pagination, PageNavigation } from "./pagination"

import "./normalize.css"
import "./Catalog.css"

import whiteLogo from "./img/globoticket-horizontal-white.svg"
import cartImg from "./img/cart.svg"

import thumbNail1 from "./img/shutterstock_415922566_thumbnail_1.jpg"
import thumbNail2 from "./img/shutterstock_606456248_thumbnail_2.jpg"
import thumbNail3 from "./img/shutterstock_1746589040_thumbnail_3.jpg"

const thumbNails = [thumbNail1, thumbNail2, thumbNail3]

const generateEventData = (n) => {
	const data = []
	for (let i = 0; i < n; i++) {
		data.push({
			name: faker.lorem.words(2),
			thumbNail: i % thumbNails.length,
			dateTime: faker.date.future().toDateString(),
			artist: faker.name.findName(),
			price: faker.random.number(100) + 20,
			tickets: faker.random.number(100) + 40,
		})
	}
	return data
}

class Event extends Component {
	shouldComponentUpdate(nextProps) {
		const { data } = this.props

		return (
			data.name + data.dateTime !==
			nextProps.data.name + nextProps.data.dateTime
		)
	}

	render() {
		const {
			thumbNail,
			dateTime,
			name,
			artist,
			price,
			tickets,
		} = this.props.data
		return (
			<tr>
				<td class="event-image">
					<img alt="thumbnail" src={thumbNails[thumbNail]} />
				</td>
				<td class="event-date">{dateTime}</td>
				<td class="event-name">{name}</td>
				<td class="event-artist">{artist}</td>
				<td class="event-price">${price}</td>
				<td class="event-price">{tickets}</td>
				<td class="event-purchase-button">
					<button>Purchase Details</button>
				</td>
			</tr>
		)
	}
}

export default class Catalog extends Component {
	state = {
		eventData: generateEventData(5),
		currentPage: 0,
		artistFilter: "",
	}

	constructor(props) {
		super(props)
		this.generatorNumberInput = React.createRef()
		this.filterInput = React.createRef()
	}

	generateEvents() {
		this.setState({
			eventData: generateEventData(
				parseInt(this.generatorNumberInput.current.value)
			),
			currentPage: 0,
		})
	}

	setFilter() {
		this.setState({
			artistFilter: this.filterInput.current.value,
			currentPage: 0,
		})
	}

	previousPage() {
		this.setState({ currentPage: this.state.currentPage - 1 })
	}

	nextPage() {
		this.setState({ currentPage: this.state.currentPage + 1 })
	}

	render() {
		var filteredEvents

		if (!this.state.artistFilter) {
			filteredEvents = this.state.eventData
		} else {
			filteredEvents = this.state.eventData.filter(
				(ed) =>
					ed.artist
						.toLowerCase()
						.indexOf(this.state.artistFilter.toLowerCase()) >= 0
			)
		}

		const filteredPages = new Pagination(filteredEvents, 5)

		return (
			<div class="container">
				<header>
					<h1>
						<img alt="logo" src={whiteLogo} />
					</h1>
					<div class="header-cart">
						<img alt="cart" src={cartImg} />
					</div>
				</header>
				<section>
					<div class="search-bar">
						<button onClick={this.setFilter.bind(this)}>
							Filter :
						</button>
						<input
							onChange={this.setFilter.bind(this)}
							ref={this.filterInput}
						></input>
					</div>
					<div class="table">
						<table>
							<thead>
								<tr>
									<th scope="col">&nbsp;</th>
									<th scope="col">Date</th>
									<th scope="col">Name</th>
									<th scope="col">Artist</th>
									<th scope="col">Price</th>
									<th scope="col">Tickets Left</th>
									<th scope="col">&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								{filteredPages
									.getPage(this.state.currentPage)
									.map((ed, i) => (
										<Event
											data={ed}
											key={ed.name + ed.dateTime}
										/>
									))}
							</tbody>
						</table>

						<PageNavigation
							nextPageHandler={this.nextPage.bind(this)}
							previousPageHandler={this.previousPage.bind(this)}
							currentPage={this.state.currentPage}
							totalPages={filteredPages.getTotalPages()}
						></PageNavigation>
					</div>
					<input
						type="number"
						ref={this.generatorNumberInput}
					></input>
					<button onClick={this.generateEvents.bind(this)}>
						Add
					</button>
				</section>
			</div>
		)
	}
}
