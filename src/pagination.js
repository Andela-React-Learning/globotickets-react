export class Pagination {
	constructor(data, pageSize) {
		this.data = data
		this.pageSize = pageSize
	}

	getPage(n) {
		const offset = n * this.pageSize
		return this.data.slice(offset, offset + this.pageSize)
	}

	getTotalPages() {
		return Math.ceil(this.data.length / this.pageSize)
	}
}

export const PageNavigation = ({
	nextPageHandler,
	previousPageHandler,
	currentPage,
	totalPages,
}) => {
	return (
		<div className="page-navigation">
			{currentPage === 0 ? null : (
				<button onClick={previousPageHandler}>◀️ Prev</button>
			)}

			{currentPage + 1 >= totalPages ? null : (
				<button onClick={nextPageHandler}>Next ▶️</button>
			)}

			<span>
				Page {currentPage + 1} of {totalPages}
			</span>
		</div>
	)
}
