import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import reportStatusConstant from '../constants/reportStatusConstant';
import reportTypeConstant from '../constants/reportTypeConstant';
import ReportStatusLabel from './labels/reportStatusLabel';
import ReportTypeLabel from './labels/reportTypeLabel';
import EmptyScreen from './emptyScreen';

class MyReportList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myReports: [],
        };
    }

    componentDidMount() {
        this.setState({
            myReports: this.props.myReports,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myReports !== this.props.myReports) {
            this.setState({
                myReports: this.props.myReports,
            });
        }
    }

    daysDiff = (date) => {
        const today = new Date();
        const bookingDate = new Date(date);
        const diffTime = today - bookingDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    render() {
        if (this.state.myReports.length === 0) {
            return <EmptyScreen />;
        }
        return this.state.myReports.rows.map((myReport) => {
            return (
                <div
                    className="my-report-item"
                    onClick={() =>
                        this.props.handleMyReportClicked(myReport.id)
                    }
                    key={myReport.id}
                >
                    <div className="my-report-item__body">
                        <div className="item-labels">
                            <ReportTypeLabel
                                type={reportTypeConstant[myReport.category]}
                            />
                            <ReportStatusLabel
                                status={reportStatusConstant[myReport.status]}
                            />
                        </div>
                        <div className="item-details">
                            <h3 className="item-name">{myReport.title}</h3>
                            <h4 className="item-location">
                                {myReport.location}
                            </h4>
                            <p>{myReport.description}</p>
                        </div>
                        <div className="item-footer">
                            <div className="report-date">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="icon-report-date"
                                />
                                <label className="label-report-date">
                                    dibuat {this.daysDiff(myReport.createdAt)}{' '}
                                    hari yang lalu oleh Saya
                                </label>
                            </div>
                            {myReport.user_assigned && (
                                <div className="report-assignment">
                                    <FontAwesomeIcon
                                        icon={faUserEdit}
                                        className="icon-report-assignment"
                                    />
                                    <label className="label-report-assignment">
                                        ditugaskan kepada{' '}
                                        {myReport.user_assigned.name}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="my-report-item__image">
                        <img src={myReport.image} alt="report image" />
                    </div>
                </div>
            );
        });
    }
}

export default MyReportList;
