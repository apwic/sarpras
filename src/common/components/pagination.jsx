import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPosts: this.props.totalPosts,
            postPerPage: 9,
            currentPage: 1,
        };
    }
    componentDidMount() {
        this.setState({
            totalPosts: this.props.totalPosts,
        });
    }
    handlePageClicked = (page) => {
        this.setState({
            currentPage: page,
        });
        this.props.handlePageClicked(page);
    };

    render() {
        const rangeStart = Math.max(1, this.state.currentPage - 1);
        const rangeEnd = Math.min(
            Math.ceil(this.state.totalPosts / this.state.postPerPage),
            rangeStart + 2,
        );
        const pageItems = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
            const isActive = i === this.state.currentPage;
            const displayStyle =
                i >= rangeStart && i <= rangeEnd ? 'block' : 'none';
            pageItems.push(
                <li
                    key={i}
                    className={`page-item ${isActive ? 'active' : ''}`}
                    style={{ display: displayStyle, borderRadius: 'unset' }}
                >
                    <button
                        style={{
                            borderRadius: 'unset',
                        }}
                        className="page-link"
                        onClick={() => this.handlePageClicked(i)}
                    >
                        {i}
                    </button>
                </li>,
            );
        }
        return (
            <nav className="controller-pagination" aria-label="...">
                <ul className="pagination">
                    {this.state.currentPage === 1 ? (
                        <li className="page-item disabled">
                            <button className="page-link button-pagination">
                                Previous
                            </button>
                        </li>
                    ) : (
                        <li className="page-item">
                            <button
                                className="page-link button-pagination"
                                onClick={() =>
                                    this.handlePageClicked(
                                        this.state.currentPage - 1,
                                    )
                                }
                            >
                                Previous
                            </button>
                        </li>
                    )}

                    {pageItems}
                    <li className="page-item">
                        {this.state.currentPage === rangeEnd ? (
                            <span className="page-link disabled button-pagination-next">
                                Next
                            </span>
                        ) : (
                            <button
                                className="page-link button-pagination-next"
                                onClick={() =>
                                    this.handlePageClicked(
                                        this.state.currentPage + 1,
                                    )
                                }
                            >
                                Next
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;
